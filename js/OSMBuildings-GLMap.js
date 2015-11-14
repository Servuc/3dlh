! function(a) {
    function b(a, b, c) {
        var d = b / 360 + .5,
            e = Math.min(1, Math.max(0, .5 - Math.log(Math.tan(Math.PI / 4 + Math.PI / 2 * a / 180)) / Math.PI / 2));
        return {
            x: d * c,
            y: e * c
        }
    }

    function c(a, b) {
        return a.replace(/\{(\w+)\}/g, function(a, c) {
            return b[c] || a
        })
    }

    function d(a, b) {
        var c = a[0] - b[0],
            d = a[1] - b[1];
        return c * c + d * d
    }

    function e(a, b, c) {
        var e = a.length;
        if (16 > e) return !1;
        var f = b.maxX - b.minX,
            g = b.maxY - b.minY,
            h = f / g;
        if (.85 > h || h > 1.15) return !1;
        for (var i, j = (f + g) / 4, k = j * j, l = 0; e > l; l++)
            if (i = d(a[l], c), .75 > i / k || i / k > 1.25) return !1;
        return !0
    }

    function f(a) {
        return 0 < a.reduce(function(a, b, c, d) {
            return a + (c < d.length - 1 ? (d[c + 1][0] - b[0]) * (d[c + 1][1] + b[1]) : 0)
        }, 0)
    }

    function g(a) {
        for (var b = 1 / 0, c = 1 / 0, d = -(1 / 0), e = -(1 / 0), f = 0; f < a.length; f++) b = Math.min(b, a[f][0]), c = Math.min(c, a[f][1]), d = Math.max(d, a[f][0]), e = Math.max(e, a[f][1]);
        return {
            minX: b,
            minY: c,
            maxX: d,
            maxY: e
        }
    }

    function h(a, b) {
        if (!a) throw b
    }

    function i(a, b, c) {
        var d = [a[0] < b[0] ? 1 : -1, a[1] < b[1] ? 1 : -1],
            e = c[0] + (a[0] < b[0] ? 1 : 0),
            f = c[1] + (a[1] < b[1] ? 1 : 0),
            g = (e - a[0]) / (b[0] - a[0]),
            i = (f - a[1]) / (b[1] - a[1]);
        return 0 > g || g > 1 || 0 > i || i > 1 ? [void 0, void 0] : (g == -(1 / 0) && (g = 1 / 0), i == -(1 / 0) && (i = 1 / 0), h(g >= 0 && i >= 0, "Invalid movement direction"), i > g ? [c[0] + d[0], c[1]] : [c[0], c[1] + d[1]])
    }

    function j(a, b, c) {
        var d = [a, b, c];
        if (d.sort(function(a, b) {
                return a[1] < b[1]
            }), a = d[0], b = d[1], c = d[2], a[1] == b[1]) return k(a, b, c);
        if (b[1] == c[1]) return k(b, c, a);
        var e = (b[1] - a[1]) / (c[1] - a[1]),
            f = [a[0] + e * (c[0] - a[0]), b[1]];
        return k(f, b, a).concat(k(f, b, c))
    }

    function k(a, b, c) {
        var d = [];
        if (h(a[1] === b[1], "not a flat triangle"), h(c[1] !== a[1], "not a triangle"), h(a[0] !== b[0], "not a triangle"), a[0] > b[0]) {
            var e = a;
            a = b, b = e
        }
        var f = [Math.floor(c[0]), Math.floor(c[1])],
            g = f.slice(0);
        d.push(f.slice(0));
        for (var j, k, l = c[1] < a[1] ? 1 : -1, m = Math.floor(c[1]) + l, n = Math.floor(a[1]) + l, o = m; n * l > o * l; o += l) {
            do d.push(f.slice(0)), j = f, f = i(c, a, f); while (f[1] * l <= o * l);
            f = j;
            do d.push(g.slice(0)), k = g, g = i(c, b, g); while (g[1] * l <= o * l);
            g = k;
            for (var p = f[0]; p <= g[0]; p++) d.push([p, o])
        }
        return d
    }

    function l(a) {
        h(4 == a.length, "Error: Quadrilateral with more or less than four vertices");
        var b = j(a[0], a[1], a[2]),
            c = j(a[0], a[2], a[3]);
        return b.concat(c)
    }

    function m(a, b, c, d, e, f, g, h, i) {
        var j = a - d,
            k = b - e,
            l = c - f,
            m = d - g,
            o = e - h,
            p = f - i,
            q = k * p - l * o,
            r = l * m - j * p,
            s = j * o - k * m;
        return n(q, r, s)
    }

    function n(a, b, c) {
        var d = Math.sqrt(a * a + b * b + c * c);
        return 0 === d && (d = 1e-5), [a / d, b / d, c / d]
    }

    function o(a, b) {
        var c = b[0] * a[0] + b[1] * a[4] + b[2] * a[8] + a[12],
            d = b[0] * a[1] + b[1] * a[5] + b[2] * a[9] + a[13],
            e = b[0] * a[2] + b[1] * a[6] + b[2] * a[10] + a[14],
            f = b[0] * a[3] + b[1] * a[7] + b[2] * a[11] + a[15];
        return [c / f, d / f, e / f]
    }

    function p(a, b, c) {
        var d = o(c, [a, b, 0]),
            e = o(c, [a, b, 1]),
            f = r(e, d);
        if (f[2] >= 0) return void 0;
        var g = -d[2] / f[2];
        return s(d, t(f, g))
    }

    function q(a, b) {
        var c = a[0] + B.center.x,
            d = a[1] + B.center.y,
            e = H * Math.pow(2, B.zoom),
            f = c / e * Math.pow(2, b),
            g = d / e * Math.pow(2, b);
        return [f, g]
    }

    function r(a, b) {
        return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
    }

    function s(a, b) {
        return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
    }

    function t(a, b) {
        return [a[0] * b, a[1] * b, a[2] * b]
    }

    function u(a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
    }

    function v(a) {
        var b = u(a);
        return [a[0] / b, a[1] / b, a[2] / b]
    }

    function w(a, b) {
        return u(r(a, b))
    }
    var x = function() {
            "use strict";

            function a(a, e) {
                var f = c(b(a[0], !0)),
                    g = e ? {
                        vertices: [],
                        indices: []
                    } : [];
                if (!f) return g;
                var h, j, k, l, m, n, o, p, q, r = 80;
                for (q = 0; r >= 0 && q < a.length; q++) r -= a[q].length;
                if (0 > r) {
                    h = f.next, j = l = h.p[0], k = m = h.p[1];
                    do n = h.p[0], o = h.p[1], j > n && (j = n), k > o && (k = o), n > l && (l = n), o > m && (m = o), h = h.next; while (h !== f);
                    p = Math.max(l - j, m - k)
                }
                return a.length > 1 && (f = i(a, f)), d(f, g, j, k, p), g
            }

            function b(a, b) {
                var c, d, e, f, g, h = 0,
                    i = a.length;
                for (c = 0, d = i - 1; i > c; d = c++) e = a[c], f = a[d], h += (f[0] - e[0]) * (e[1] + f[1]);
                if (b === h > 0)
                    for (c = 0; i > c; c++) g = y(a[c], g);
                else
                    for (c = i - 1; c >= 0; c--) g = y(a[c], g);
                return g
            }

            function c(a, b) {
                b || (b = a);
                var c, d = a;
                do
                    if (c = !1, r(d.p, d.next.p) || 0 === q(d.prev.p, d.p, d.next.p)) {
                        if (d.prev.next = d.next, d.next.prev = d.prev, d.prevZ && (d.prevZ.nextZ = d.nextZ), d.nextZ && (d.nextZ.prevZ = d.prevZ), d = b = d.prev, d === d.next) return null;
                        c = !0
                    } else d = d.next;
                while (c || d !== b);
                return b
            }

            function d(a, b, i, j, k, m) {
                if (a) {
                    var n = void 0 !== b.vertices;
                    m || void 0 === i || l(a, i, j, k);
                    for (var o, p, q = a; a.prev !== a.next;)
                        if (o = a.prev, p = a.next, f(a, i, j, k)) n ? (e(b, o), e(b, a), e(b, p)) : (b.push(o.p), b.push(a.p), b.push(p.p)), p.prev = o, o.next = p, a.prevZ && (a.prevZ.nextZ = a.nextZ), a.nextZ && (a.nextZ.prevZ = a.prevZ), a = p.next, q = p.next;
                        else if (a = p, a === q) {
                        m ? 1 === m ? (a = g(a, b), d(a, b, i, j, k, 2)) : 2 === m && h(a, b, i, j, k) : d(c(a), b, i, j, k, 1);
                        break
                    }
                }
            }

            function e(a, b) {
                b.source && (b = b.source);
                var c = b.index;
                if (null === c) {
                    var d = b.p.length,
                        e = a.vertices;
                    b.index = c = e.length / d;
                    for (var f = 0; d > f; f++) e.push(b.p[f])
                }
                a.indices.push(c)
            }

            function f(a, b, c, d) {
                var e = a.prev.p,
                    f = a.p,
                    g = a.next.p,
                    h = e[0],
                    i = f[0],
                    j = g[0],
                    k = e[1],
                    l = f[1],
                    m = g[1],
                    o = h * l - k * i,
                    p = h * m - k * j,
                    q = j * l - m * i,
                    r = o - p - q;
                if (0 >= r) return !1;
                var s, t, u, v, w, x, y, z = m - k,
                    A = h - j,
                    B = k - l,
                    C = i - h;
                if (void 0 !== b) {
                    var D = i > h ? j > h ? h : j : j > i ? i : j,
                        E = l > k ? m > k ? k : m : m > l ? l : m,
                        F = h > i ? h > j ? h : j : i > j ? i : j,
                        G = k > l ? k > m ? k : m : l > m ? l : m,
                        H = n(D, E, b, c, d),
                        I = n(F, G, b, c, d);
                    for (y = a.nextZ; y && y.z <= I;)
                        if (s = y.p, y = y.nextZ, s !== e && s !== g && (t = s[0], u = s[1], v = z * t + A * u - p, v >= 0 && (w = B * t + C * u + o, w >= 0 && (x = r - v - w, x >= 0 && (v && w || v && x || w && x))))) return !1;
                    for (y = a.prevZ; y && y.z >= H;)
                        if (s = y.p, y = y.prevZ, s !== e && s !== g && (t = s[0], u = s[1], v = z * t + A * u - p, v >= 0 && (w = B * t + C * u + o, w >= 0 && (x = r - v - w, x >= 0 && (v && w || v && x || w && x))))) return !1
                } else
                    for (y = a.next.next; y !== a.prev;)
                        if (s = y.p, y = y.next, t = s[0], u = s[1], v = z * t + A * u - p, v >= 0 && (w = B * t + C * u + o, w >= 0 && (x = r - v - w, x >= 0 && (v && w || v && x || w && x)))) return !1; return !0
            }

            function g(a, b) {
                var c = !!b.vertices,
                    d = a;
                do {
                    var f = d.prev,
                        g = d.next.next;
                    if (s(f.p, d.p, d.next.p, g.p) && u(f, g) && u(g, f)) {
                        c ? (e(b, f), e(b, d), e(b, g)) : (b.push(f.p), b.push(d.p), b.push(g.p)), f.next = g, g.prev = f;
                        var h = d.prevZ,
                            i = d.nextZ && d.nextZ.nextZ;
                        h && (h.nextZ = i), i && (i.prevZ = h), d = a = g
                    }
                    d = d.next
                } while (d !== a);
                return d
            }

            function h(a, b, e, f, g) {
                var h = a;
                do {
                    for (var i = h.next.next; i !== h.prev;) {
                        if (p(h, i)) {
                            var j = x(h, i);
                            return h = c(h, h.next), j = c(j, j.next), d(h, b, e, f, g), void d(j, b, e, f, g)
                        }
                        i = i.next
                    }
                    h = h.next
                } while (h !== a)
            }

            function i(a, d) {
                for (var e = a.length, f = [], g = 1; e > g; g++) {
                    var h = c(b(a[g], !1));
                    h && f.push(o(h))
                }
                for (f.sort(w), g = 0; g < f.length; g++) j(f[g], d), d = c(d, d.next);
                return d
            }

            function j(a, b) {
                if (b = k(a, b)) {
                    var d = x(b, a);
                    c(d, d.next)
                }
            }

            function k(a, b) {
                var c, d, e, f = b,
                    g = a.p,
                    h = g[0],
                    i = g[1],
                    j = -(1 / 0);
                do {
                    if (d = f.p, e = f.next.p, i <= d[1] && i >= e[1]) {
                        var k = d[0] + (i - d[1]) * (e[0] - d[0]) / (e[1] - d[1]);
                        h >= k && k > j && (j = k, c = d[0] < e[0] ? f : f.next)
                    }
                    f = f.next
                } while (f !== b);
                if (!c) return null;
                var l, m, n, o, p, q, r = c.p[0],
                    s = c.p[1],
                    t = h * s - i * r,
                    v = h * i - i * j,
                    w = i - i,
                    x = h - j,
                    y = i - s,
                    z = r - h,
                    A = t - v - (j * s - i * r),
                    B = 0 >= A ? -1 : 1,
                    C = c,
                    D = 1 / 0;
                for (f = c.next; f !== C;) l = f.p[0], m = f.p[1], n = h - l, n >= 0 && l >= r && (o = (w * l + x * m - v) * B, o >= 0 && (p = (y * l + z * m + t) * B, p >= 0 && A * B - o - p >= 0 && (q = Math.abs(i - m) / n, D > q && u(f, a) && (c = f, D = q)))), f = f.next;
                return c
            }

            function l(a, b, c, d) {
                var e = a;
                do null === e.z && (e.z = n(e.p[0], e.p[1], b, c, d)), e.prevZ = e.prev, e.nextZ = e.next, e = e.next; while (e !== a);
                e.prevZ.nextZ = null, e.prevZ = null, m(e)
            }

            function m(a) {
                for (var b, c, d, e, f, g, h, i, j = 1;;) {
                    for (c = a, a = null, f = null, g = 0; c;) {
                        for (g++, d = c, h = 0, b = 0; j > b && (h++, d = d.nextZ, d); b++);
                        for (i = j; h > 0 || i > 0 && d;) 0 === h ? (e = d, d = d.nextZ, i--) : 0 !== i && d ? c.z <= d.z ? (e = c, c = c.nextZ, h--) : (e = d, d = d.nextZ, i--) : (e = c, c = c.nextZ, h--), f ? f.nextZ = e : a = e, e.prevZ = f, f = e;
                        c = d
                    }
                    if (f.nextZ = null, 1 >= g) return a;
                    j *= 2
                }
            }

            function n(a, b, c, d, e) {
                return a = 1e3 * (a - c) / e, a = 16711935 & (a | a << 8), a = 252645135 & (a | a << 4), a = 858993459 & (a | a << 2), a = 1431655765 & (a | a << 1), b = 1e3 * (b - d) / e, b = 16711935 & (b | b << 8), b = 252645135 & (b | b << 4), b = 858993459 & (b | b << 2), b = 1431655765 & (b | b << 1), a | b << 1
            }

            function o(a) {
                var b = a,
                    c = a;
                do b.p[0] < c.p[0] && (c = b), b = b.next; while (b !== a);
                return c
            }

            function p(a, b) {
                return !t(a, a.p, b.p) && u(a, b) && u(b, a) && v(a, a.p, b.p)
            }

            function q(a, b, c) {
                var d = (b[1] - a[1]) * (c[0] - b[0]) - (b[0] - a[0]) * (c[1] - b[1]);
                return d > 0 ? 1 : 0 > d ? -1 : 0
            }

            function r(a, b) {
                return a[0] === b[0] && a[1] === b[1]
            }

            function s(a, b, c, d) {
                return q(a, b, c) !== q(a, b, d) && q(c, d, a) !== q(c, d, b)
            }

            function t(a, b, c) {
                var d = a;
                do {
                    var e = d.p,
                        f = d.next.p;
                    if (e !== b && f !== b && e !== c && f !== c && s(e, f, b, c)) return !0;
                    d = d.next
                } while (d !== a);
                return !1
            }

            function u(a, b) {
                return -1 === q(a.prev.p, a.p, a.next.p) ? -1 !== q(a.p, b.p, a.next.p) && -1 !== q(a.p, a.prev.p, b.p) : -1 === q(a.p, b.p, a.prev.p) || -1 === q(a.p, a.next.p, b.p)
            }

            function v(a, b, c) {
                var d = a,
                    e = !1,
                    f = (b[0] + c[0]) / 2,
                    g = (b[1] + c[1]) / 2;
                do {
                    var h = d.p,
                        i = d.next.p;
                    h[1] > g != i[1] > g && f < (i[0] - h[0]) * (g - h[1]) / (i[1] - h[1]) + h[0] && (e = !e), d = d.next
                } while (d !== a);
                return e
            }

            function w(a, b) {
                return a.p[0] - b.p[0]
            }

            function x(a, b) {
                var c = new z(a.p),
                    d = new z(b.p),
                    e = a.next,
                    f = b.prev;
                return c.source = a, d.source = b, a.next = b, b.prev = a, c.next = e, e.prev = c, d.next = c, c.prev = d, f.next = d, d.prev = f, d
            }

            function y(a, b) {
                var c = new z(a);
                return b ? (c.next = b.next, c.prev = b, b.next.prev = c, b.next = c) : (c.prev = c, c.next = c), c
            }

            function z(a) {
                this.p = a, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.source = null, this.index = null
            }
            return a
        }(),
        y = function(a) {
            function b(a, b, c) {
                return 0 > c && (c += 1), c > 1 && (c -= 1), 1 / 6 > c ? a + 6 * (b - a) * c : .5 > c ? b : 2 / 3 > c ? a + (b - a) * (2 / 3 - c) * 6 : a
            }

            function c(a, b) {
                return Math.min(b, Math.max(0, a || 0))
            }
            var d = {
                    aliceblue: "#f0f8ff",
                    antiquewhite: "#faebd7",
                    aqua: "#00ffff",
                    aquamarine: "#7fffd4",
                    azure: "#f0ffff",
                    beige: "#f5f5dc",
                    bisque: "#ffe4c4",
                    black: "#000000",
                    blanchedalmond: "#ffebcd",
                    blue: "#0000ff",
                    blueviolet: "#8a2be2",
                    brown: "#a52a2a",
                    burlywood: "#deb887",
                    cadetblue: "#5f9ea0",
                    chartreuse: "#7fff00",
                    chocolate: "#d2691e",
                    coral: "#ff7f50",
                    cornflowerblue: "#6495ed",
                    cornsilk: "#fff8dc",
                    crimson: "#dc143c",
                    cyan: "#00ffff",
                    darkblue: "#00008b",
                    darkcyan: "#008b8b",
                    darkgoldenrod: "#b8860b",
                    darkgray: "#a9a9a9",
                    darkgrey: "#a9a9a9",
                    darkgreen: "#006400",
                    darkkhaki: "#bdb76b",
                    darkmagenta: "#8b008b",
                    darkolivegreen: "#556b2f",
                    darkorange: "#ff8c00",
                    darkorchid: "#9932cc",
                    darkred: "#8b0000",
                    darksalmon: "#e9967a",
                    darkseagreen: "#8fbc8f",
                    darkslateblue: "#483d8b",
                    darkslategray: "#2f4f4f",
                    darkslategrey: "#2f4f4f",
                    darkturquoise: "#00ced1",
                    darkviolet: "#9400d3",
                    deeppink: "#ff1493",
                    deepskyblue: "#00bfff",
                    dimgray: "#696969",
                    dimgrey: "#696969",
                    dodgerblue: "#1e90ff",
                    firebrick: "#b22222",
                    floralwhite: "#fffaf0",
                    forestgreen: "#228b22",
                    fuchsia: "#ff00ff",
                    gainsboro: "#dcdcdc",
                    ghostwhite: "#f8f8ff",
                    gold: "#ffd700",
                    goldenrod: "#daa520",
                    gray: "#808080",
                    grey: "#808080",
                    green: "#008000",
                    greenyellow: "#adff2f",
                    honeydew: "#f0fff0",
                    hotpink: "#ff69b4",
                    indianred: "#cd5c5c",
                    indigo: "#4b0082",
                    ivory: "#fffff0",
                    khaki: "#f0e68c",
                    lavender: "#e6e6fa",
                    lavenderblush: "#fff0f5",
                    lawngreen: "#7cfc00",
                    lemonchiffon: "#fffacd",
                    lightblue: "#add8e6",
                    lightcoral: "#f08080",
                    lightcyan: "#e0ffff",
                    lightgoldenrodyellow: "#fafad2",
                    lightgray: "#d3d3d3",
                    lightgrey: "#d3d3d3",
                    lightgreen: "#90ee90",
                    lightpink: "#ffb6c1",
                    lightsalmon: "#ffa07a",
                    lightseagreen: "#20b2aa",
                    lightskyblue: "#87cefa",
                    lightslategray: "#778899",
                    lightslategrey: "#778899",
                    lightsteelblue: "#b0c4de",
                    lightyellow: "#ffffe0",
                    lime: "#00ff00",
                    limegreen: "#32cd32",
                    linen: "#faf0e6",
                    magenta: "#ff00ff",
                    maroon: "#800000",
                    mediumaquamarine: "#66cdaa",
                    mediumblue: "#0000cd",
                    mediumorchid: "#ba55d3",
                    mediumpurple: "#9370db",
                    mediumseagreen: "#3cb371",
                    mediumslateblue: "#7b68ee",
                    mediumspringgreen: "#00fa9a",
                    mediumturquoise: "#48d1cc",
                    mediumvioletred: "#c71585",
                    midnightblue: "#191970",
                    mintcream: "#f5fffa",
                    mistyrose: "#ffe4e1",
                    moccasin: "#ffe4b5",
                    navajowhite: "#ffdead",
                    navy: "#000080",
                    oldlace: "#fdf5e6",
                    olive: "#808000",
                    olivedrab: "#6b8e23",
                    orange: "#ffa500",
                    orangered: "#ff4500",
                    orchid: "#da70d6",
                    palegoldenrod: "#eee8aa",
                    palegreen: "#98fb98",
                    paleturquoise: "#afeeee",
                    palevioletred: "#db7093",
                    papayawhip: "#ffefd5",
                    peachpuff: "#ffdab9",
                    peru: "#cd853f",
                    pink: "#ffc0cb",
                    plum: "#dda0dd",
                    powderblue: "#b0e0e6",
                    purple: "#800080",
                    rebeccapurple: "#663399",
                    red: "#ff0000",
                    rosybrown: "#bc8f8f",
                    royalblue: "#4169e1",
                    saddlebrown: "#8b4513",
                    salmon: "#fa8072",
                    sandybrown: "#f4a460",
                    seagreen: "#2e8b57",
                    seashell: "#fff5ee",
                    sienna: "#a0522d",
                    silver: "#c0c0c0",
                    skyblue: "#87ceeb",
                    slateblue: "#6a5acd",
                    slategray: "#708090",
                    slategrey: "#708090",
                    snow: "#fffafa",
                    springgreen: "#00ff7f",
                    steelblue: "#4682b4",
                    tan: "#d2b48c",
                    teal: "#008080",
                    thistle: "#d8bfd8",
                    tomato: "#ff6347",
                    turquoise: "#40e0d0",
                    violet: "#ee82ee",
                    wheat: "#f5deb3",
                    white: "#ffffff",
                    whitesmoke: "#f5f5f5",
                    yellow: "#ffff00",
                    yellowgreen: "#9acd32"
                },
                e = function(a) {
                    if (a = a || "", "object" == typeof a) {
                        var b = a;
                        this.R = c(b.r, max), this.G = c(b.g, max), this.B = c(b.b, max), this.A = void 0 !== b.a ? c(b.a, 1) : 1, this.isValid = !0
                    } else if ("string" == typeof a) {
                        a = a.toLowerCase(), a = d[a] || a;
                        var e;
                        (e = a.match(/^#?(\w{2})(\w{2})(\w{2})$/)) ? (this.R = parseInt(e[1], 16) / 255, this.G = parseInt(e[2], 16) / 255, this.B = parseInt(e[3], 16) / 255, this.A = 1, this.isValid = !0) : (e = a.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/)) && (this.R = parseInt(e[1], 10) / 255, this.G = parseInt(e[2], 10) / 255, this.B = parseInt(e[3], 10) / 255, this.A = e[4] ? parseFloat(e[5]) : 1, this.isValid = !0)
                    }
                };
            return e.prototype = {
                toHSL: function() {
                    var a, b, c = Math.max(this.R, this.G, this.B),
                        d = Math.min(this.R, this.G, this.B),
                        e = (c + d) / 2,
                        f = c - d;
                    if (f) {
                        switch (b = e > .5 ? f / (2 - c - d) : f / (c + d), c) {
                            case this.R:
                                a = (this.G - this.B) / f + (this.G < this.B ? 6 : 0);
                                break;
                            case this.G:
                                a = (this.B - this.R) / f + 2;
                                break;
                            case this.B:
                                a = (this.R - this.G) / f + 4
                        }
                        a *= 60
                    } else a = b = 0;
                    return {
                        h: a,
                        s: b,
                        l: e
                    }
                },
                fromHSL: function(a) {
                    if (0 === a.s) this.R = a.l, this.G = a.l, this.B = a.l;
                    else {
                        var c = a.l < .5 ? a.l * (1 + a.s) : a.l + a.s - a.l * a.s,
                            d = 2 * a.l - c;
                        a.h /= 360, this.R = b(d, c, a.h + 1 / 3), this.G = b(d, c, a.h), this.B = b(d, c, a.h - 1 / 3)
                    }
                    return this
                },
                toString: function() {
                    return 1 === this.A ? "#" + ((1 << 24) + (Math.round(255 * this.R) << 16) + (Math.round(255 * this.G) << 8) + Math.round(255 * this.B)).toString(16).slice(1, 7) : "rgba(" + [Math.round(255 * this.R), Math.round(255 * this.G), Math.round(255 * this.B), this.A.toFixed(2)].join(",") + ")"
                },
                toArray: function() {
                    return [this.R, this.G, this.B]
                },
                hue: function(a) {
                    var b = this.toHSL();
                    return b.h *= a, this.fromHSL(b), this
                },
                saturation: function(a) {
                    var b = this.toHSL();
                    return b.s *= a, this.fromHSL(b), this
                },
                lightness: function(a) {
                    var b = this.toHSL();
                    return b.l *= a, this.fromHSL(b), this
                },
                alpha: function(a) {
                    return this.A *= a, this
                }
            }, e
        }(this),
        z = function(a, b, c) {
            var d = O.createElement("CANVAS");
            d.style.position = "absolute", d.width = b, d.height = c, a.appendChild(d);
            var e, f = {
                antialias: !0,
                depth: !0,
                premultipliedAlpha: !1
            };
            try {
                e = d.getContext("webgl", f)
            } catch (g) {}
            if (!e) try {
                e = d.getContext("experimental-webgl", f)
            } catch (g) {}
            if (!e) throw new Error("WebGL not supported");
            return d.addEventListener("webglcontextlost", function(a) {
                console.warn("context lost")
            }), d.addEventListener("webglcontextrestored", function(a) {
                console.warn("context restored")
            }), e.viewport(0, 0, b, c), e.cullFace(e.BACK), e.enable(e.CULL_FACE), e.enable(e.DEPTH_TEST), e.clearColor(.5, .5, .5, 1), e.anisotropyExtension = e.getExtension("EXT_texture_filter_anisotropic"), e.anisotropyExtension && (e.anisotropyExtension.maxAnisotropyLevel = e.getParameter(e.anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)), z.use(e)
        };
    z.use = function(a) {
        return function(b) {
            var c = {};
            return c.context = a, c.start = function(a) {
                    return setInterval(function() {
                        requestAnimationFrame(a)
                    }, 17)
                }, c.stop = function(a) {
                    clearInterval(a)
                }, c.destroy = function() {
                    a.canvas.parentNode.removeChild(a.canvas), a = null
                }, c.util = {}, c.util.nextPowerOf2 = function(a) {
                    return a--, a |= a >> 1, a |= a >> 2, a |= a >> 4, a |= a >> 8, a |= a >> 16, a++, a
                }, c.util.calcNormal = function(a, b, c, d, e, f, g, h, i) {
                    var j = a - d,
                        k = b - e,
                        l = c - f,
                        m = d - g,
                        n = e - h,
                        o = f - i,
                        p = k * o - l * n,
                        q = l * m - j * o,
                        r = j * n - k * m;
                    return this.calcUnit(p, q, r)
                }, c.util.calcUnit = function(a, b, c) {
                    var d = Math.sqrt(a * a + b * b + c * c);
                    return 0 === d && (d = 1e-5), [a / d, b / d, c / d]
                }, c.Buffer = function(a, c) {
                    this.id = b.createBuffer(), this.itemSize = a, this.numItems = c.length / a, b.bindBuffer(b.ARRAY_BUFFER, this.id), b.bufferData(b.ARRAY_BUFFER, c, b.STATIC_DRAW), c = null
                }, c.Buffer.prototype = {
                    enable: function() {
                        b.bindBuffer(b.ARRAY_BUFFER, this.id)
                    },
                    destroy: function() {
                        b.deleteBuffer(this.id), this.id = null
                    }
                }, c.Framebuffer = function(a, b) {
                    this.setSize(a, b)
                }, c.Framebuffer.prototype = {
                    setSize: function(a, d) {
                        if (this.frameBuffer = b.createFramebuffer(), b.bindFramebuffer(b.FRAMEBUFFER, this.frameBuffer), a = c.util.nextPowerOf2(a), d = c.util.nextPowerOf2(d), a !== this.width || d !== this.height) {
                            if (this.width = a, this.height = d, this.renderBuffer = b.createRenderbuffer(), b.bindRenderbuffer(b.RENDERBUFFER, this.renderBuffer), b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, a, d), this.renderTexture && this.renderTexture.destroy(), this.renderTexture = new c.texture.Data(a, d), b.framebufferRenderbuffer(b.FRAMEBUFFER, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, this.renderBuffer), b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, this.renderTexture.id, 0), b.checkFramebufferStatus(b.FRAMEBUFFER) !== b.FRAMEBUFFER_COMPLETE) throw new Error("This combination of framebuffer attachments does not work");
                            b.bindRenderbuffer(b.RENDERBUFFER, null), b.bindFramebuffer(b.FRAMEBUFFER, null)
                        }
                    },
                    enable: function() {
                        b.bindFramebuffer(b.FRAMEBUFFER, this.frameBuffer), b.bindRenderbuffer(b.RENDERBUFFER, this.renderBuffer)
                    },
                    disable: function() {
                        b.bindFramebuffer(b.FRAMEBUFFER, null), b.bindRenderbuffer(b.RENDERBUFFER, null)
                    },
                    getData: function() {
                        var a = new Uint8Array(this.width * this.height * 4);
                        return b.readPixels(0, 0, this.width, this.height, b.RGBA, b.UNSIGNED_BYTE, a), a
                    },
                    destroy: function() {
                        this.renderTexture && this.renderTexture.destroy()
                    }
                }, c.Shader = function(a) {
                    if (this.id = b.createProgram(), this.attach(b.VERTEX_SHADER, a.vertexShader), this.attach(b.FRAGMENT_SHADER, a.fragmentShader), b.linkProgram(this.id), !b.getProgramParameter(this.id, b.LINK_STATUS)) throw new Error(b.getProgramParameter(this.id, b.VALIDATE_STATUS) + "\n" + b.getError());
                    this.attributeNames = a.attributes, this.uniformNames = a.uniforms
                }, c.Shader.prototype = {
                    locateAttribute: function(a) {
                        var c = b.getAttribLocation(this.id, a);
                        return 0 > c ? void console.error('unable to locate attribute "' + a + '" in shader') : (b.enableVertexAttribArray(c), void(this.attributes[a] = c))
                    },
                    locateUniform: function(a) {
                        var c = b.getUniformLocation(this.id, a);
                        return 0 > c ? void console.error('unable to locate uniform "' + a + '" in shader') : void(this.uniforms[a] = c)
                    },
                    attach: function(a, c) {
                        var d = b.createShader(a);
                        if (b.shaderSource(d, c), b.compileShader(d), !b.getShaderParameter(d, b.COMPILE_STATUS)) throw new Error(b.getShaderInfoLog(d));
                        b.attachShader(this.id, d)
                    },
                    enable: function() {
                        b.useProgram(this.id);
                        var a;
                        if (this.attributeNames)
                            for (this.attributes = {}, a = 0; a < this.attributeNames.length; a++) this.locateAttribute(this.attributeNames[a]);
                        if (this.uniformNames)
                            for (this.uniforms = {}, a = 0; a < this.uniformNames.length; a++) this.locateUniform(this.uniformNames[a]);
                        return this
                    },
                    disable: function() {
                        if (this.attributes)
                            for (var a in this.attributes) b.disableVertexAttribArray(this.attributes[a]);
                        this.attributes = null, this.uniforms = null
                    },
                    destroy: function() {
                        this.disable(), this.id = null
                    }
                }, c.Matrix = function(a) {
                    a ? this.data = new Float32Array(a) : this.identity()
                },
                function() {
                    function a(a) {
                        return a * Math.PI / 180
                    }

                    function b(a, b, c) {
                        var d = b[0],
                            e = b[1],
                            f = b[2],
                            g = b[3],
                            h = b[4],
                            i = b[5],
                            j = b[6],
                            k = b[7],
                            l = b[8],
                            m = b[9],
                            n = b[10],
                            o = b[11],
                            p = b[12],
                            q = b[13],
                            r = b[14],
                            s = b[15],
                            t = c[0],
                            u = c[1],
                            v = c[2],
                            w = c[3],
                            x = c[4],
                            y = c[5],
                            z = c[6],
                            A = c[7],
                            B = c[8],
                            C = c[9],
                            D = c[10],
                            E = c[11],
                            F = c[12],
                            G = c[13],
                            H = c[14],
                            I = c[15];
                        a[0] = d * t + e * x + f * B + g * F, a[1] = d * u + e * y + f * C + g * G, a[2] = d * v + e * z + f * D + g * H, a[3] = d * w + e * A + f * E + g * I, a[4] = h * t + i * x + j * B + k * F, a[5] = h * u + i * y + j * C + k * G, a[6] = h * v + i * z + j * D + k * H, a[7] = h * w + i * A + j * E + k * I, a[8] = l * t + m * x + n * B + o * F, a[9] = l * u + m * y + n * C + o * G, a[10] = l * v + m * z + n * D + o * H, a[11] = l * w + m * A + n * E + o * I, a[12] = p * t + q * x + r * B + s * F, a[13] = p * u + q * y + r * C + s * G, a[14] = p * v + q * z + r * D + s * H, a[15] = p * w + q * A + r * E + s * I
                    }
                    c.Matrix.prototype = {
                        identity: function() {
                            return this.data = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), this
                        },
                        multiply: function(a) {
                            return b(this.data, this.data, a.data), this
                        },
                        translate: function(a, c, d) {
                            return b(this.data, this.data, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a, c, d, 1]), this
                        },
                        rotateX: function(c) {
                            var d = a(c),
                                e = Math.cos(d),
                                f = Math.sin(d);
                            return b(this.data, this.data, [1, 0, 0, 0, 0, e, f, 0, 0, -f, e, 0, 0, 0, 0, 1]), this
                        },
                        rotateY: function(c) {
                            var d = a(c),
                                e = Math.cos(d),
                                f = Math.sin(d);
                            return b(this.data, this.data, [e, 0, -f, 0, 0, 1, 0, 0, f, 0, e, 0, 0, 0, 0, 1]), this
                        },
                        rotateZ: function(c) {
                            var d = a(c),
                                e = Math.cos(d),
                                f = Math.sin(d);
                            return b(this.data, this.data, [e, -f, 0, 0, f, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), this
                        },
                        scale: function(a, c, d) {
                            return b(this.data, this.data, [a, 0, 0, 0, 0, c, 0, 0, 0, 0, d, 0, 0, 0, 0, 1]), this
                        }
                    }, c.Matrix.multiply = function(a, c) {
                        var d = new Float32Array(16);
                        return b(d, a.data, c.data), d
                    }, c.Matrix.Perspective = function(a, b, d, e) {
                        var f = 1 / Math.tan(a * (Math.PI / 180) / 2),
                            g = 1 / (d - e);
                        return new c.Matrix([f / b, 0, 0, 0, 0, f, 0, 0, 0, 0, (e + d) * g, -1, 0, 0, 2 * e * d * g, 0])
                    }, c.Matrix.invert3 = function(a) {
                        var b = a[0],
                            c = a[1],
                            d = a[2],
                            e = a[4],
                            f = a[5],
                            g = a[6],
                            h = a[8],
                            i = a[9],
                            j = a[10],
                            k = j * f - g * i,
                            l = -j * e + g * h,
                            m = i * e - f * h,
                            n = b * k + c * l + d * m;
                        return n ? (n = 1 / n, [k * n, (-j * c + d * i) * n, (g * c - d * f) * n, l * n, (j * b - d * h) * n, (-g * b + d * e) * n, m * n, (-i * b + c * h) * n, (f * b - c * e) * n]) : null
                    }, c.Matrix.transpose = function(a) {
                        return new Float32Array([a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]])
                    }, c.Matrix.transform = function(a) {
                        var b = a[12],
                            c = a[13],
                            d = a[14],
                            e = a[15];
                        return {
                            x: (b / e + 1) / 2,
                            y: (c / e + 1) / 2,
                            z: (d / e + 1) / 2
                        }
                    }, c.Matrix.invert = function(a) {
                        var b = new Float32Array(16),
                            c = a[0],
                            d = a[1],
                            e = a[2],
                            f = a[3],
                            g = a[4],
                            h = a[5],
                            i = a[6],
                            j = a[7],
                            k = a[8],
                            l = a[9],
                            m = a[10],
                            n = a[11],
                            o = a[12],
                            p = a[13],
                            q = a[14],
                            r = a[15],
                            s = c * h - d * g,
                            t = c * i - e * g,
                            u = c * j - f * g,
                            v = d * i - e * h,
                            w = d * j - f * h,
                            x = e * j - f * i,
                            y = k * p - l * o,
                            z = k * q - m * o,
                            A = k * r - n * o,
                            B = l * q - m * p,
                            C = l * r - n * p,
                            D = m * r - n * q,
                            E = s * D - t * C + u * B + v * A - w * z + x * y;
                        if (E) return E = 1 / E, b[0] = (h * D - i * C + j * B) * E, b[1] = (e * C - d * D - f * B) * E, b[2] = (p * x - q * w + r * v) * E, b[3] = (m * w - l * x - n * v) * E, b[4] = (i * A - g * D - j * z) * E, b[5] = (c * D - e * A + f * z) * E, b[6] = (q * u - o * x - r * t) * E, b[7] = (k * x - m * u + n * t) * E, b[8] = (g * C - h * A + j * y) * E, b[9] = (d * A - c * C - f * y) * E, b[10] = (o * w - p * u + r * s) * E, b[11] = (l * u - k * w - n * s) * E, b[12] = (h * z - g * B - i * y) * E, b[13] = (c * B - d * z + e * y) * E, b[14] = (p * t - o * v - q * s) * E, b[15] = (k * v - l * t + m * s) * E, b
                    }
                }(), c.texture = {}, c.texture.Image = function() {
                    this.id = b.createTexture(), b.bindTexture(b.TEXTURE_2D, this.id), b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0), b.bindTexture(b.TEXTURE_2D, null)
                }, c.texture.Image.prototype = {
                    clamp: function(a, b) {
                        if (a.width <= b && a.height <= b) return a;
                        var c = b,
                            d = b,
                            e = a.width / a.height;
                        1 > e ? c = Math.round(d * e) : d = Math.round(c / e);
                        var f = O.createElement("CANVAS");
                        f.width = c, f.height = d;
                        var g = f.getContext("2d");
                        return g.drawImage(a, 0, 0, f.width, f.height), f
                    },
                    load: function(a, b) {
                        var c = new Image;
                        return c.crossOrigin = "*", c.onload = function() {
                            this.set(c), b && b(c)
                        }.bind(this), c.onerror = function() {
                            b && b()
                        }, c.src = a, this
                    },
                    color: function(a) {
                        return b.bindTexture(b.TEXTURE_2D, this.id), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 1, 1, 0, b.RGBA, b.UNSIGNED_BYTE, new Uint8Array([255 * a[0], 255 * a[1], 255 * a[2], 255 * (void 0 === a[3] ? 1 : a[3])])), b.bindTexture(b.TEXTURE_2D, null), this
                    },
                    set: function(a) {
                        return this.id ? (a = this.clamp(a, b.getParameter(b.MAX_TEXTURE_SIZE)), b.bindTexture(b.TEXTURE_2D, this.id), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR_MIPMAP_NEAREST), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a), b.generateMipmap(b.TEXTURE_2D), b.anisotropyExtension && b.texParameterf(b.TEXTURE_2D, b.anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT, b.anisotropyExtension.maxAnisotropyLevel), b.bindTexture(b.TEXTURE_2D, null), this) : void 0
                    },
                    enable: function(a) {
                        return this.id ? (b.activeTexture(b.TEXTURE0 + (a || 0)), b.bindTexture(b.TEXTURE_2D, this.id), this) : void 0
                    },
                    destroy: function() {
                        b.bindTexture(b.TEXTURE_2D, null), b.deleteTexture(this.id), this.id = null
                    }
                }, c.texture.Data = function(a, c, d, e) {
                    this.id = b.createTexture(), b.bindTexture(b.TEXTURE_2D, this.id), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
                    var f = null;
                    if (d) {
                        var g = a * c * 4;
                        f = new Uint8Array(g), f.set(d.subarray(0, g))
                    }
                    b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, a, c, 0, b.RGBA, b.UNSIGNED_BYTE, f), b.bindTexture(b.TEXTURE_2D, null)
                }, c.texture.Data.prototype = {
                    enable: function(a) {
                        return b.activeTexture(b.TEXTURE0 + (a || 0)), b.bindTexture(b.TEXTURE_2D, this.id), this
                    },
                    destroy: function() {
                        b.bindTexture(b.TEXTURE_2D, null), b.deleteTexture(this.id), this.id = null
                    }
                }, c.mesh = {}, c.mesh.addQuad = function(a, b, c, d, e, f) {
                    this.addTriangle(a, b, c, d, f), this.addTriangle(a, d, e, b, f)
                }, c.mesh.addTriangle = function(a, b, d, e, f) {
                    a.vertices.push(b[0], b[1], b[2], d[0], d[1], d[2], e[0], e[1], e[2]);
                    var g = c.util.calcNormal(b[0], b[1], b[2], d[0], d[1], d[2], e[0], e[1], e[2]);
                    a.normals.push(g[0], g[1], g[2], g[0], g[1], g[2], g[0], g[1], g[2]), a.colors.push(f[0], f[1], f[2], f[3], f[0], f[1], f[2], f[3], f[0], f[1], f[2], f[3])
                }, c.mesh.Triangle = function(a, b) {
                    var d = {
                            vertices: [],
                            normals: [],
                            colors: []
                        },
                        e = [-a / 2, -a / 2, 0],
                        f = [a / 2, -a / 2, 0],
                        g = [a / 2, a / 2, 0];
                    c.mesh.addTriangle(d, e, f, g, b), this.vertexBuffer = new c.Buffer(3, new Float32Array(d.vertices)), this.normalBuffer = new c.Buffer(3, new Float32Array(d.normals)), this.colorBuffer = new c.Buffer(4, new Float32Array(d.colors)), this.transform = new c.Matrix
                }, c.mesh.Plane = function(a, b) {
                    var d = {
                            vertices: [],
                            normals: [],
                            colors: []
                        },
                        e = [-a / 2, -a / 2, 0],
                        f = [a / 2, -a / 2, 0],
                        g = [a / 2, a / 2, 0],
                        h = [-a / 2, a / 2, 0];
                    c.mesh.addQuad(d, e, f, g, h, b), this.vertexBuffer = new c.Buffer(3, new Float32Array(d.vertices)), this.normalBuffer = new c.Buffer(3, new Float32Array(d.normals)), this.colorBuffer = new c.Buffer(4, new Float32Array(d.colors)), this.transform = new c.Matrix
                }, c.mesh.Cube = function(a, b) {
                    var d = {
                            vertices: [],
                            normals: [],
                            colors: []
                        },
                        e = [-a / 2, -a / 2, -a / 2],
                        f = [a / 2, -a / 2, -a / 2],
                        g = [a / 2, a / 2, -a / 2],
                        h = [-a / 2, a / 2, -a / 2],
                        i = [-a / 2, -a / 2, a / 2],
                        j = [a / 2, -a / 2, a / 2],
                        k = [a / 2, a / 2, a / 2],
                        l = [-a / 2, a / 2, a / 2];
                    c.mesh.addQuad(d, e, f, g, h, b), c.mesh.addQuad(d, i, j, k, l, b), c.mesh.addQuad(d, e, f, j, i, b), c.mesh.addQuad(d, f, g, k, j, b), c.mesh.addQuad(d, g, h, l, k, b), c.mesh.addQuad(d, h, e, i, l, b), this.vertexBuffer = new c.Buffer(3, new Float32Array(d.vertices)), this.normalBuffer = new c.Buffer(3, new Float32Array(d.normals)), this.colorBuffer = new c.Buffer(4, new Float32Array(d.colors)), this.transform = new c.Matrix
                }, c
        }(a)
    }, "function" == typeof define ? define([], z) : "object" == typeof exports ? module.exports = z : a.GLX = z;
    var A, B, C, D, E = function(a) {
        A = this, a = a || {}, a.style && this.setStyle(a.style), A.baseURL = a.baseURL || ".", Z.bendRadius = 500, Z.bendDistance = 500, Z.backgroundColor = new y(a.backgroundColor || N).toArray(), Z.fogColor = new y(a.fogColor || M).toArray(), Z.highlightColor = new y(a.highlightColor || L).toArray(), Z.Buildings.showBackfaces = a.showBackfaces, Z.optimize = a.optimize || "quality", this.attribution = a.attribution || E.ATTRIBUTION, A.minZoom = parseFloat(a.minZoom) || 15, A.maxZoom = parseFloat(a.maxZoom) || 22, A.maxZoom < A.minZoom && (A.maxZoom = A.minZoom)
    };
    E.VERSION = "1.0.1", E.ATTRIBUTION = '© OSM Buildings <a href="http://osmbuildings.org">http://osmbuildings.org</a>', E.prototype = {
        on: function(a, b) {
            return F.on(a, b), this
        },
        off: function(a, b) {
            F.off(a, b)
        },
        addTo: function(a) {
            return B = a, C = new z(B.container, B.width, B.height), D = C.context, B.addLayer(this), Z.start(), this
        },
        remove: function() {
            Z.stop(), B.removeLayer(this), B = null
        },
        setStyle: function(a) {
            return K = a.color || a.wallColor || K, this
        },
        transform: function(a, b, c) {
            var d = B.project(a, b, H * Math.pow(2, B.zoom)),
                e = d.x - B.center.x,
                f = d.y - B.center.y,
                g = 1 / Math.pow(2, 16 - B.zoom),
                h = (new C.Matrix).translate(0, 0, c).scale(g, g, g * J).translate(e, f, 0),
                i = C.Matrix.multiply(h, Z.viewProjMatrix),
                j = C.Matrix.transform(i);
            return {
                x: j.x * B.width,
                y: B.height - j.y * B.height,
                z: j.z
            }
        },
        addOBJ: function(a, b, c) {
            return new Y.OBJ(a, b, c)
        },
        addGeoJSON: function(a, b) {
            return new Y.GeoJSON(a, b)
        },
        addGeoJSONTiles: function(a, b) {
            return b = b || {}, b.fixedZoom = b.fixedZoom || 16, A._dataGrid = new V(a, X.Tile, b), A._dataGrid
        },
        addMapTiles: function(a, b) {
            return A._basemapGrid = new V(a, $.Tile, b), A._basemapGrid
        },
        highlight: function(a) {
            Z.Buildings.highlightID = a ? Z.Interaction.idToColor(a) : null
        },
        show: function(a, b) {
            return W.remove("hidden", a, b), this
        },
        hide: function(a, b) {
            return W.add("hidden", a, b), this
        },
        getTarget: function(a, b) {
            return Z.Interaction.getTarget(a, b)
        },
        destroy: function() {
            Z.destroy(), F.destroy(), A._basemapGrid && A._basemapGrid.destroy(), A._dataGrid && A._dataGrid.destroy(), C.destroy()
        }
    }, "function" == typeof a.define ? a.define([], E) : "object" == typeof a.exports ? a.module.exports = E : a.OSMBuildings = E;
    var F = {};
    ! function() {
        var a = {};
        F.emit = function(b, c) {
            if (a[b]) {
                var d = a[b];
                requestAnimationFrame(function() {
                    for (var a = 0, b = d.length; b > a; a++) d[a](c)
                })
            }
        }, F.on = function(b, c) {
            a[b] || (a[b] = []), a[b].push(c)
        }, F.off = function(b, c) {
            if (a[b])
                for (var d = a[b], e = 0; e < d.length; e++)
                    if (d[e] === c) return void d.splice(e, 1)
        }, F.destroy = function() {
            a = {}
        }
    }();
    var G = {};
    ! function() {
        var a, b = 0;
        G.setBusy = function() {
            b || (a ? (clearTimeout(a), a = null) : F.emit("busy")), b++
        }, G.setIdle = function() {
            b && (b--, b || (a = setTimeout(function() {
                a = null, F.emit("idle")
            }, 33)))
        }, G.isBusy = function() {
            return !!b
        }
    }();
    var H = 256,
        I = 10,
        J = .7,
        K = "rgb(220, 210, 200)",
        L = "#f08000",
        M = "#f0f8ff",
        N = "#efe8e0",
        O = a.document,
        P = 6378137,
        Q = P * Math.PI * 2,
        R = {};
    ! function() {
        function a(a) {
            return "string" != typeof a ? null : (a = a.toLowerCase(), "#" === a[0] ? a : c[d[a] || a] || null)
        }
        var b = 3,
            c = {
                brick: "#cc7755",
                bronze: "#ffeecc",
                canvas: "#fff8f0",
                concrete: "#999999",
                copper: "#a0e0d0",
                glass: "#e8f8f8",
                gold: "#ffcc00",
                plants: "#009933",
                metal: "#aaaaaa",
                panel: "#fff8f0",
                plaster: "#999999",
                roof_tiles: "#f08060",
                silver: "#cccccc",
                slate: "#666666",
                stone: "#996666",
                tar_paper: "#333333",
                wood: "#deb887"
            },
            d = {
                asphalt: "tar_paper",
                bitumen: "tar_paper",
                block: "stone",
                bricks: "brick",
                glas: "glass",
                glassfront: "glass",
                grass: "plants",
                masonry: "stone",
                granite: "stone",
                panels: "panel",
                paving_stones: "stone",
                plastered: "plaster",
                rooftiles: "roof_tiles",
                roofingfelt: "tar_paper",
                sandstone: "stone",
                sheet: "canvas",
                sheets: "canvas",
                shingle: "tar_paper",
                shingles: "tar_paper",
                slates: "slate",
                steel: "metal",
                tar: "tar_paper",
                tent: "canvas",
                thatch: "plants",
                tile: "roof_tiles",
                tiles: "roof_tiles"
            };
        R.GeoJSON = function(c) {
            return c.height = c.height || (c.levels ? c.levels * b : I), c.minHeight = c.minHeight || (c.minLevel ? c.minLevel * b : 0), c.wallColor = c.wallColor || c.color || a(c.material), c.roofColor = c.roofColor || c.color || a(c.roofMaterial), c
        }
    }();
    var S = {};
    ! function() {
        function a(a, c) {
            if (b[a]) return b[a];
            var d = new XMLHttpRequest;
            return d.onreadystatechange = function() {
                4 === d.readyState && (delete b[a], !d.status || d.status < 200 || d.status > 299 || c(d))
            }, b[a] = d, d.open("GET", a), d.send(null), {
                abort: function() {
                    b[a] && (d.abort(), delete b[a])
                }
            }
        }
        var b = {};
        S.getText = function(b, c) {
            return a(b, function(a) {
                void 0 !== a.responseText && c(a.responseText)
            })
        }, S.getXML = function(b, c) {
            return a(b, function(a) {
                void 0 !== a.responseXML && c(a.responseXML)
            })
        }, S.getJSON = function(b, c) {
            return a(b, function(a) {
                if (a.responseText) {
                    var d;
                    try {
                        d = JSON.parse(a.responseText)
                    } catch (e) {
                        console.warn("Could not parse JSON from " + b + "\n" + e.message)
                    }
                    c(d)
                }
            })
        }, S.abortAll = function() {
            for (var a in b) b[a].abort();
            b = {}
        }, S.destroy = function() {
            this.abortAll()
        }
    }();
    var T = {
            interaction: {
                vertex: '#ifdef GL_ES\n  precision mediump float;\n#endif\n#define halfPi 1.57079632679\nattribute vec4 aPosition;\nattribute vec3 aID;\nattribute vec4 aFilter;\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjMatrix;\nuniform mat4 uMatrix;\nuniform float uFogRadius;\nuniform float uTime;\nvarying vec4 vColor;\nuniform float uBendRadius;\nuniform float uBendDistance;\nvoid main() {\n  float t = clamp((uTime-aFilter.r) / (aFilter.g-aFilter.r), 0.0, 1.0);\n  float f = aFilter.b + (aFilter.a-aFilter.b) * t;\n  if (f == 0.0) {\n    gl_Position = vec4(0.0, 0.0, 0.0, 0.0);\n    vColor = vec4(0.0, 0.0, 0.0, 0.0);\n  } else {\n    vec4 pos = vec4(aPosition.x, aPosition.y, aPosition.z*f, aPosition.w);\n    //*** bending ***************************************************************\n  //  vec4 mwPosition = uViewMatrix * uModelMatrix * aPosition;\n  //\n  //  float innerRadius = uBendRadius + mwPosition.y;\n  //  float depth = abs(mwPosition.z);\n  //  float s = depth-uBendDistance;\n  //  float theta = min(max(s, 0.0)/uBendRadius, halfPi);\n  //\n  //  // halfPi*uBendRadius, not halfPi*innerRadius, because the "base" of a building\n  //  // travels the full uBendRadius path\n  //  float newY = cos(theta)*innerRadius - uBendRadius - max(s-halfPi*uBendRadius, 0.0);\n  //  float newZ = normalize(mwPosition.z) * (min(depth, uBendDistance) + sin(theta)*innerRadius);\n  //\n  //  vec4 newPosition = vec4(mwPosition.x, newY, newZ, 1.0);\n  //  gl_Position = uProjMatrix * newPosition;\n    gl_Position = uMatrix * pos;\n    vec4 mPosition = vec4(uModelMatrix * pos);\n    float distance = length(mPosition);\n    if (distance > uFogRadius) {\n      vColor = vec4(0.0, 0.0, 0.0, 0.0);\n    } else {\n      vColor = vec4(aID, 1.0);\n    }\n  }\n}\n',
                fragment: "#ifdef GL_ES\n  precision mediump float;\n#endif\nvarying vec4 vColor;\nvoid main() {\n  gl_FragColor = vColor;\n}\n"
            },
            buildings: {
                vertex: '#ifdef GL_ES\n  precision mediump float;\n#endif\n#define halfPi 1.57079632679\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec3 aColor;\nattribute vec4 aFilter;\nattribute vec3 aID;\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjMatrix;\nuniform mat4 uMatrix;\nuniform mat3 uNormalTransform;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform vec3 uFogColor;\nuniform float uFogRadius;\nuniform vec3 uHighlightColor;\nuniform vec3 uHighlightID;\nuniform float uTime;\nvarying vec3 vColor;\nfloat fogBlur = 200.0;\nfloat gradientHeight = 90.0;\nfloat gradientStrength = 0.4;\nuniform float uBendRadius;\nuniform float uBendDistance;\nvoid main() {\n  float t = clamp((uTime-aFilter.r) / (aFilter.g-aFilter.r), 0.0, 1.0);\n  float f = aFilter.b + (aFilter.a-aFilter.b) * t;\n  if (f == 0.0) {\n    gl_Position = vec4(0.0, 0.0, 0.0, 0.0);\n    vColor = vec3(0.0, 0.0, 0.0);\n  } else {\n    vec4 pos = vec4(aPosition.x, aPosition.y, aPosition.z*f, aPosition.w);\n    //*** bending ***************************************************************\n  //  vec4 mwPosition = uViewMatrix * uModelMatrix * aPosition;\n  //\n  //  float innerRadius = uBendRadius + mwPosition.y;\n  //  float depth = abs(mwPosition.z);\n  //  float s = depth-uBendDistance;\n  //  float theta = min(max(s, 0.0)/uBendRadius, halfPi);\n  //\n  //  // halfPi*uBendRadius, not halfPi*innerRadius, because the "base" of a building\n  //  // travels the full uBendRadius path\n  //  float newY = cos(theta)*innerRadius - uBendRadius - max(s-halfPi*uBendRadius, 0.0);\n  //  float newZ = normalize(mwPosition.z) * (min(depth, uBendDistance) + sin(theta)*innerRadius);\n  //\n  //  vec4 newPosition = vec4(mwPosition.x, newY, newZ, 1.0);\n  //  gl_Position = uProjMatrix * newPosition;\n    gl_Position = uMatrix * pos;\n    //*** highlight object ******************************************************\n    vec3 color = aColor;\n    if (uHighlightID.r == aID.r && uHighlightID.g == aID.g && uHighlightID.b == aID.b) {\n      color = mix(aColor, uHighlightColor, 0.5);\n    }\n    //*** light intensity, defined by light direction on surface ****************\n    vec3 transformedNormal = aNormal * uNormalTransform;\n    float lightIntensity = max( dot(transformedNormal, uLightDirection), 0.0) / 1.5;\n    color = color + uLightColor * lightIntensity;\n    //*** vertical shading ******************************************************\n    float verticalShading = clamp((gradientHeight-pos.z) / (gradientHeight/gradientStrength), 0.0, gradientStrength);\n    //*** fog *******************************************************************\n    vec4 mPosition = uModelMatrix * pos;\n    float distance = length(mPosition);\n    float fogIntensity = (distance - uFogRadius) / fogBlur + 1.1; // <- shifts blur in/out\n    fogIntensity = clamp(fogIntensity, 0.0, 1.0);\n    //***************************************************************************\n    vColor = mix(color-verticalShading, uFogColor, fogIntensity);\n  }\n}\n',
                fragment: "#ifdef GL_ES\n  precision mediump float;\n#endif\nvarying vec3 vColor;\nvoid main() {\n  gl_FragColor = vec4(vColor, 1.0);\n}\n"
            },
            skydome: {
                vertex: '#ifdef GL_ES\n  precision mediump float;\n#endif\n#define halfPi 1.57079632679\nattribute vec4 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjMatrix;\nuniform mat4 uMatrix;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nfloat gradientHeight = 10.0;\nfloat gradientStrength = 1.0;\nuniform float uBendRadius;\nuniform float uBendDistance;\nvoid main() {\n  //*** bending ***************************************************************\n//  vec4 mwPosition = uViewMatrix * uModelMatrix * aPosition;\n//\n//  float innerRadius = uBendRadius + mwPosition.y;\n//  float depth = abs(mwPosition.z);\n//  float s = depth-uBendDistance;\n//  float theta = min(max(s, 0.0)/uBendRadius, halfPi);\n//\n//  // halfPi*uBendRadius, not halfPi*innerRadius, because the "base" of a building\n//  // travels the full uBendRadius path\n//  float newY = cos(theta)*innerRadius - uBendRadius - max(s-halfPi*uBendRadius, 0.0);\n//  float newZ = normalize(mwPosition.z) * (min(depth, uBendDistance) + sin(theta)*innerRadius);\n//\n//  vec4 newPosition = vec4(mwPosition.x, newY, newZ, 1.0);\n//  gl_Position = uProjMatrix * newPosition;\n  gl_Position = uMatrix * aPosition;\n  vTexCoord = aTexCoord;\n  vFogIntensity = clamp((gradientHeight-aPosition.z) / (gradientHeight/gradientStrength), 0.0, gradientStrength);\n}\n',
                fragment: "#ifdef GL_ES\n  precision mediump float;\n#endif\nuniform sampler2D uTexIndex;\nuniform vec3 uFogColor;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nvoid main() {\n  vec3 color = vec3(texture2D(uTexIndex, vec2(vTexCoord.x, -vTexCoord.y)));\n  gl_FragColor = vec4(mix(color, uFogColor, vFogIntensity), 1.0);\n}\n"
            },
            basemap: {
                vertex: '#ifdef GL_ES\n  precision mediump float;\n#endif\n#define halfPi 1.57079632679\nattribute vec4 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjMatrix;\nuniform mat4 uMatrix;\nuniform float uFogRadius;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nfloat fogBlur = 200.0;\nuniform float uBendRadius;\nuniform float uBendDistance;\nvoid main() {\n  //*** bending ***************************************************************\n//  vec4 mwPosition = uViewMatrix * uModelMatrix * aPosition;\n//\n//  float innerRadius = uBendRadius + mwPosition.y;\n//  float depth = abs(mwPosition.z);\n//  float s = depth-uBendDistance;\n//  float theta = min(max(s, 0.0)/uBendRadius, halfPi);\n//\n//  // halfPi*uBendRadius, not halfPi*innerRadius, because the "base" of a building\n//  // travels the full uBendRadius path\n//  float newY = cos(theta)*innerRadius - uBendRadius - max(s-halfPi*uBendRadius, 0.0);\n//  float newZ = normalize(mwPosition.z) * (min(depth, uBendDistance) + sin(theta)*innerRadius);\n//\n//  vec4 newPosition = vec4(mwPosition.x, newY, newZ, 1.0);\n//  vec4 glPosition = uProjMatrix * newPosition;\n  vec4 glPosition = uMatrix * aPosition;\n  gl_Position = glPosition;\n  vTexCoord = aTexCoord;\n  //*** fog *******************************************************************\n  vec4 mPosition = uModelMatrix * aPosition;\n  float distance = length(mPosition);\n  // => (distance - (uFogRadius - fogBlur)) / (uFogRadius - (uFogRadius - fogBlur));\n  float fogIntensity = (distance - uFogRadius) / fogBlur + 1.1; // <- shifts blur in/out\n  vFogIntensity = clamp(fogIntensity, 0.0, 1.0);\n  //vFogIntensity = 0.0;\n}\n',
                fragment: "#ifdef GL_ES\n  precision mediump float;\n#endif\nuniform sampler2D uTexIndex;\nuniform vec3 uFogColor;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nvoid main() {\n  vec3 color = vec3(texture2D(uTexIndex, vec2(vTexCoord.x, 1.0-vTexCoord.y)));\n  gl_FragColor = vec4(mix(color, uFogColor, vFogIntensity), 1.0);\n}\n"
            },
            texture: {
                vertex: "#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uMatrix;\nvarying vec2 vTexCoord;\nvoid main() {\n  gl_Position = uMatrix * aPosition;\n  vTexCoord = aTexCoord;\n}\n",
                fragment: "#ifdef GL_ES\n  precision mediump float;\n#endif\nuniform sampler2D uTexIndex;\nvarying vec2 vTexCoord;\nvoid main() {\n  gl_FragColor = vec4(texture2D(uTexIndex, vTexCoord.st).rgb, 1.0);\n}\n"
            },
            normalmap: {
                vertex: "#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec4 aFilter;\nuniform mat4 uMatrix;\nuniform float uTime;\nvarying vec3 vNormal;\nvoid main() {\n  float t = clamp((uTime-aFilter.r) / (aFilter.g-aFilter.r), 0.0, 1.0);\n  float f = aFilter.b + (aFilter.a-aFilter.b) * t;\n  if (f == 0.0) {\n    gl_Position = vec4(0.0, 0.0, 0.0, 0.0);\n    vNormal = vec3(0.0, 0.0, 0.0);\n  } else {\n    gl_Position = uMatrix * vec4(aPosition.x, aPosition.y, aPosition.z*f, aPosition.w);\n    vNormal = aNormal;\n  }\n}",
                fragment: "#ifdef GL_ES\n  precision mediump float;\n#endif\n//uniform sampler2D uTexIndex;\nvarying vec2 vTexCoord;\nvarying vec3 vNormal;\nvoid main() {\n  gl_FragColor = vec4( (vNormal + 1.0)/2.0, 1.0);\n}\n"
            },
            depth: {
                vertex: "#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec4 aFilter;\nuniform mat4 uMatrix;\nuniform mat4 uModelMatrix;\nuniform float uTime;\nvarying vec3 vWorldPosition;\nvoid main() {\n  float t = clamp((uTime-aFilter.r) / (aFilter.g-aFilter.r), 0.0, 1.0);\n  float f = aFilter.b + (aFilter.a-aFilter.b) * t;\n  if (f == 0.0) {\n    gl_Position = vec4(0.0, 0.0, 0.0, 0.0);\n    vWorldPosition = vec3(0.0, 0.0, 0.0);\n  } else {\n    vec4 pos = vec4(aPosition.x, aPosition.y, aPosition.z*f, aPosition.w);\n    gl_Position = uMatrix * pos;\n    /* in order for the SSAO (which is based on this depth shader) to work\n     * correctly in conjunction with the fog shading, we need to replicate\n     * the fog computation here. This way, the ambient occlusion shader can\n     * later attenuate the ambient occlusion effect in the foggy areas.\n     * However, we cannot simply replicate the vertex shader-based fog\n     * computation here, because it won't work with the dummy map plane:\n     * The map plane is centered directly below the camera, so all four\n     * of its vertices have the same distance from the camera. With the\n     * current fog model, this means that they also are all equally foggy.\n     * Computing the fog intensity in the vertex shader would therefor\n     * interpolate this identical fog intensity over the whole quad, meaning\n     * that all its pixels would incorrectly appear equally foggy (The normal\n     * fogging for map tiles and buildings has the same issue, but can get away\n     * with it, because it shades rather small objects where each face indeed\n     * has an almost constant fog intensity).\n     * Instead, we only compute the world-space vertex positions here, let them\n     * - correctly - get interpolated by the rasterizing stage, and then\n     * compute the correct fog intensities per pixel in the fragment shader */\n    vec4 worldPos = uModelMatrix * pos;\n    vWorldPosition = worldPos.xyz / worldPos.w;\n  }\n}\n",
                fragment: "\n#ifdef GL_ES\n  precision mediump float;\n#endif\nuniform float uFogRadius;\nconst float fogBlur = 200.0;\nvarying vec3 vWorldPosition;\n/* Note: the depth shader needs to not only store depth information, but\n *       also the fog intensity as well.\n * Rationale: In the current infrastructure, ambient occlusion does not \n * directly affect the building and map shading, but rather is later blended \n * onto the whole scene as a screen-space effect. This, however, is not\n * compatible with fogging: buildings in the fog gradually blend into the \n * background, but the ambient occlusion applied in screen space does not.\n * In the foggy area, this yields barely visible buildings with fully visible\n * ambient occlusion - an irritating effect.\n * To fix this, the depth shader stores not only depth values per pixel, but\n * also computes the fog intensity and stores it in the depth texture along\n * with the color-encoded depth values.\n * This way, the ambient occlusion shader can later not only compute the\n * actual ambient occlusion based on the depth values, but can attenuate\n * the effect in the foggy areas based on the fog intensity.\n */\nvoid main() {\n  // 5000.0 is an empirically-determined factor specific to OSMBuildings\n  float depth = (gl_FragCoord.z / gl_FragCoord.w)/5000.0;\n  if (depth > 1.0)\n    depth = 1.0;\n    \n  float z = floor(depth*256.0)/256.0;\n  depth = (depth - z) * 256.0;\n  float z1 = floor(depth*256.0)/256.0;\n  depth = (depth - z) * 256.0;\n  float z2 = floor(depth*256.0)/256.0;\n  float dist = length(vWorldPosition);\n  float fogIntensity = (dist - uFogRadius) / fogBlur + 1.1;\n  fogIntensity = clamp(fogIntensity, 0.0, 1.0);\n  // option 1: this line outputs high-precision (24bit) depth values\n  gl_FragColor = vec4(z, z1, z2, fogIntensity);\n  \n  // option 2: this line outputs human-interpretable depth values, but with low precision\n  //gl_FragColor = vec4(z, z, z, 1.0); \n}\n"
            },
            ambientFromDepth: {
                vertex: "#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uMatrix;\nvarying vec2 vTexCoord;\nvoid main() {\n  gl_Position = uMatrix * aPosition;\n  vTexCoord = aTexCoord;\n}\n",
                fragment: "#ifdef GL_FRAGMENT_PRECISION_HIGH\n  // we need high precision for the depth values\n  precision highp float;\n#else\n  precision mediump float;\n#endif\nuniform sampler2D uTexIndex;\nuniform float uInverseTexWidth;   //in 1/pixels, e.g. 1/512 if the texture is 512px wide\nuniform float uInverseTexHeight;  //in 1/pixels\nuniform float uEffectStrength;\nvarying vec2 vTexCoord;\n/* Retrieves the depth value (dx, dy) pixels away from 'pos' from texture 'uTexIndex'. */\nfloat getDepth(vec2 pos, int dx, int dy)\n{\n  //retrieve the color-coded depth\n  vec4 codedDepth = texture2D(uTexIndex, vec2(pos.s + float(dx) * uInverseTexWidth, \n                                              pos.t + float(dy) * uInverseTexHeight));\n  //convert back to depth value\n  return codedDepth.x + \n         codedDepth.y/ 256.0 + \n         codedDepth.z/(256.0*256.0);\n}\n/* getOcclusionFactor() determines a heuristic factor (from [0..1]) for how \n * much the fragment at 'pos' with depth 'depthHere'is occluded by the \n * fragment that is (dx, dy) texels away from it.\n */\nfloat getOcclusionFactor(float depthHere, vec2 pos, int dx, int dy)\n{\n    float depthThere = getDepth(pos, dx, dy);\n    /* if the fragment at (dx, dy) has no depth (i.e. there was nothing rendered there), \n     * then 'here' is not occluded (result 1.0) */\n    if (depthThere == 0.0)\n      return 1.0;\n    /* if the fragment at (dx, dy) is further away from the viewer than 'here', then\n     * 'here is not occluded' */\n    if (depthHere < depthThere )\n      return 1.0;\n      \n    float relDepthDiff = depthThere / depthHere;\n    /* if the fragment at (dx, dy) is closer to the viewer than 'here', then it occludes\n     * 'here'. The occlusion is the higher the bigger the depth difference between the two\n     * locations is.\n     * However, if the depth difference is too high, we assume that 'there' lies in a\n     * completely different depth region of the scene than 'here' and thus cannot occlude\n     * 'here'. This last assumption gets rid of very dark artifacts around tall buildings.\n     */\n    return relDepthDiff > 0.95 ? relDepthDiff : 1.0;\n}\n/* This shader approximates the ambient occlusion in screen space (SSAO). \n * It is based on the assumption that a pixel will be occluded by neighboring \n * pixels iff. those have a depth value closer to the camera than the original\n * pixel itself (the function getOcclusionFactor() computes this occlusion \n * by a single other pixel).\n *\n * A naive approach would sample all pixels within a given distance. For an\n * interesting-looking effect, the sampling area needs to be at least 9 pixels \n * wide (-/+ 4), requiring 81 texture lookups per pixel for ambient occlusion.\n * This overburdens many GPUs.\n * To make the ambient occlusion computation faster, we employ the following \n * tricks:\n * 1. We do not consider all texels in the sampling area, but only a select few \n *    (at most 16). This causes some sampling artifacts, which are later\n *    removed by blurring the ambient occlusion texture (this is done in a\n *    separate shader).\n * 2. The further away an object is the fewer samples are considered and the\n *    closer are these samples to the texel for which the ambient occlusion is\n *    being computed. The rationale is that ambient occlusion attempts to de-\n *    determine occlusion by *nearby* other objects. Due to the perspective \n *    projection, the further away objects are, the smaller they become. \n *    So the further away objects are, the closer are those nearby other objects\n *    in screen-space, and thus texels further away no longer need to be \n *    considered.\n *    As a positive side-effect, this also reduces the total number of texels \n *    that need to be sampled.\n */\nvoid main() {\n  float depthHere = getDepth(vTexCoord.st, 0, 0);\n  float fogIntensity = texture2D(uTexIndex, vTexCoord.st).w;\n  if (depthHere == 0.0)\n  {\n	//there was nothing rendered 'here' --> it can't be occluded\n    gl_FragColor = vec4( vec3(1.0), 1.0);\n    return;\n  }\n  \n  float occlusionFactor = 1.0;\n  \n  //always consider the direct horizontal and vertical neighbors for the ambient map \n  occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  -1,   0);\n  occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  +1,   0);\n  occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,   0,  -1);\n  occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,   0,  +1);\n  /* note: exponents are hand-tuned to give about the same brightness no matter\n   *       how many samples are considered (4, 8 or 16) */\n  float exponent = 60.0;  \n  \n  if (depthHere < 0.4)\n  {\n    /* for closer objects, also consider the texels that are two pixels \n     * away diagonally. */\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  -2,  -2);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  +2,  +2);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  +2,  -2);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  -2,  +2);\n    exponent = 12.0;\n  }\n    \n  if (depthHere < 0.3)\n  {\n    /* for the closest objects, also consider the texels that are four pixels \n     * away horizontally, vertically and diagonally */\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  -4,   0);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  +4,   0);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,   0,  -4);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,   0,  +4);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  -4,  -4);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  +4,  +4);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  +4,  -4);\n    occlusionFactor *= getOcclusionFactor(depthHere, vTexCoord.st,  -4,  +4);\n    exponent = 4.0;\n  }\n  occlusionFactor = pow(occlusionFactor, exponent);\n  occlusionFactor = 1.0 - ((1.0 - occlusionFactor) * uEffectStrength);\n  \n  occlusionFactor = 1.0 - ((1.0- occlusionFactor) * (1.0-fogIntensity));\n  gl_FragColor = vec4( vec3(occlusionFactor) , 1.0);\n}\n"
            },
            blur: {
                vertex: "#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uMatrix;\nvarying vec2 vTexCoord;\nvoid main() {\n  gl_Position = uMatrix * aPosition;\n  vTexCoord = aTexCoord;\n}\n",
                fragment: "#ifdef GL_ES\n  precision mediump float;\n#endif\nuniform sampler2D uTexIndex;\nuniform float uInverseTexWidth;   //in 1/pixels, e.g. 1/512 if the texture is 512px wide\nuniform float uInverseTexHeight;  //in 1/pixels\nvarying vec2 vTexCoord;\n/* Retrieves the texel color at (dx, dy) pixels away from 'pos' from texture 'uTexIndex'. */\nvec4 getTexel(vec2 pos, int dx, int dy)\n{\n  //retrieve the color-coded depth\n  return texture2D(uTexIndex, vec2(pos.s + float(dx) * uInverseTexWidth, \n                                   pos.t + float(dy) * uInverseTexHeight));\n}\nvoid main() {\n  vec4 center = texture2D(uTexIndex, vTexCoord);\n  vec4 nonDiagonalNeighbors = getTexel(vTexCoord, -1, 0) +\n                              getTexel(vTexCoord, +1, 0) +\n                              getTexel(vTexCoord,  0,-1) +\n                              getTexel(vTexCoord,  0,+1);\n  vec4 diagonalNeighbors =    getTexel(vTexCoord, -1,-1) +\n                              getTexel(vTexCoord, +1,+1) +\n                              getTexel(vTexCoord, -1,+1) +\n                              getTexel(vTexCoord, +1,-1);  \n  \n  //approximate Gaussian blur (mean 0.0, stdev 1.0)\n  gl_FragColor = 0.2/1.0 * center + \n                 0.5/4.0 * nonDiagonalNeighbors + \n                 0.3/4.0 * diagonalNeighbors;\n}\n"
            }
        },
        U = {};
    ! function() {
        function a(a, b, c) {
            var d = a[0] - b[0],
                e = a[1] - b[1],
                f = a[2] - b[2],
                g = b[0] - c[0],
                h = b[1] - c[1],
                i = b[2] - c[2],
                j = e * i - f * h,
                k = f * g - d * i,
                l = d * h - e * g,
                m = n(j, k, l);
            return 0 === Math.round(5e3 * m[2])
        }
        var b = 16,
            c = 24;
        U.quad = function(a, b, c, d, e) {
            var f = 0;
            return f += this.addTriangle(a, b, c, d), f += this.addTriangle(a, c, e, d)
        }, U.circle = function(a, b, d, e) {
            for (var f, g, h = 0, i = 0; c > i; i++) f = i / c, g = (i + 1) / c, h += this.addTriangle(a, [b[0] + d * Math.sin(f * Math.PI * 2), b[1] + d * Math.cos(f * Math.PI * 2), e], [b[0], b[1], e], [b[0] + d * Math.sin(g * Math.PI * 2), b[1] + d * Math.cos(g * Math.PI * 2), e]);
            return h
        }, U.polygon = function(a, b, c) {
            for (var d = x(b), e = 0, f = 0, g = d.length - 2; g > f; f += 3) e += this.addTriangle(a, [d[f][0], d[f][1], c], [d[f + 1][0], d[f + 1][1], c], [d[f + 2][0], d[f + 2][1], c]);
            return e
        }, U.polygon3d = function(b, c) {
            var d, e, f, g = c[0],
                h = g.length,
                i = 0;
            if (4 >= h) return i += this.addTriangle(b, g[0], g[2], g[1]), 4 === h && (i += this.addTriangle(b, g[0], g[3], g[2])), i;
            if (a(g[0], g[1], g[2])) {
                for (var j = 0, k = c[0].length; k > j; j++) c[0][j] = [c[0][j][2], c[0][j][1], c[0][j][0]];
                for (d = x(c), e = 0, f = d.length - 2; f > e; e += 3) i += this.addTriangle(b, [d[e][2], d[e][1], d[e][0]], [d[e + 1][2], d[e + 1][1], d[e + 1][0]], [d[e + 2][2], d[e + 2][1], d[e + 2][0]]);
                return i
            }
            for (d = x(c), e = 0, f = d.length - 2; f > e; e += 3) i += this.addTriangle(b, [d[e][0], d[e][1], d[e][2]], [d[e + 1][0], d[e + 1][1], d[e + 1][2]], [d[e + 2][0], d[e + 2][1], d[e + 2][2]]);
            return i
        }, U.cylinder = function(a, b, d, e, f, g) {
            for (var h, i, j, k, l, m, n = 0, o = c, p = 2 * Math.PI, q = 0; o > q; q++) h = q / o * p, i = (q + 1) / o * p, j = Math.sin(h), k = Math.cos(h), l = Math.sin(i), m = Math.cos(i), n += this.addTriangle(a, [b[0] + d * j, b[1] + d * k, f], [b[0] + e * l, b[1] + e * m, g], [b[0] + d * l, b[1] + d * m, f]), 0 !== e && (n += this.addTriangle(a, [b[0] + e * j, b[1] + e * k, g], [b[0] + e * l, b[1] + e * m, g], [b[0] + d * j, b[1] + d * k, f]));
            return n
        }, U.dome = function(a, c, d, e, f) {
            for (var g, h, i, j, k, l, m, n, o, p, q = 0, r = f - e, s = b / 2, t = Math.PI / 2, u = 0; s > u; u++) g = u / s * t - t, h = (u + 1) / s * t - t, i = Math.sin(g), j = Math.cos(g), k = Math.sin(h), l = Math.cos(h), m = j * d, n = l * d, o = e - i * r, p = e - k * r, q += this.cylinder(a, c, n, m, p, o);
            return q
        }, U.pyramid = function(a, b, c, d, e) {
            b = b[0];
            for (var f = 0, g = 0, h = b.length - 1; h > g; g++) f += this.addTriangle(a, [b[g][0], b[g][1], d], [b[g + 1][0], b[g + 1][1], d], [c[0], c[1], e]);
            return f
        }, U.extrusion = function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = 0, l = 0, m = b.length; m > l; l++) {
                e = b[l], f = e.length - 1, (e[0][0] !== e[f][0] || e[0][1] !== e[f][1]) && (e.push(e[0]), f++);
                for (var n = 0; f > n; n++) g = e[n], h = e[n + 1], i = c, j = d, k += this.quad(a, [g[0], g[1], i], [h[0], h[1], i], [g[0], g[1], j], [h[0], h[1], j])
            }
            return k
        }, U.addTriangle = function(a, b, c, d) {
            a.vertices.push(b[0], b[1], b[2], d[0], d[1], d[2], c[0], c[1], c[2]);
            var e = m(b[0], b[1], b[2], c[0], c[1], c[2], d[0], d[1], d[2]);
            return a.normals.push(e[0], e[1], e[2], e[0], e[1], e[2], e[0], e[1], e[2]), 3
        }
    }();
    var V = function(a, b, c) {
        this.tiles = {}, this.buffer = 1, this.source = a, this.tileClass = b, c = c || {}, this.bounds = c.bounds, this.fixedZoom = c.fixedZoom, this.tileOptions = {
            color: c.color
        }, this.minZoom = parseFloat(c.minZoom) || A.minZoom, this.maxZoom = parseFloat(c.maxZoom) || A.maxZoom, this.maxZoom < this.minZoom && (this.maxZoom = this.minZoom), B.on("change", this._onChange = function() {
            this.update(500)
        }.bind(this)), B.on("resize", this._onResize = this.update.bind(this)), this.update()
    };
    V.prototype = {
        update: function(a) {
            return B.zoom < this.minZoom || B.zoom > this.maxZoom ? void 0 : a ? void(this.debounce || (this.debounce = setTimeout(function() {
                this.debounce = null, this.loadTiles()
            }.bind(this), a))) : void this.loadTiles()
        },
        getURL: function(a, b, d) {
            var e = "abcd" [(a + b) % 4];
            return c(this.source, {
                s: e,
                x: a,
                y: b,
                z: d
            })
        },
        loadTiles: function() {
            var a, b, c, e, f = Math.round(this.fixedZoom || B.zoom),
                g = [],
                h = [B.center.x / H << 0, B.center.y / H << 0],
                i = Z.getViewQuad(Z.viewProjMatrix.data);
            for (e = 0; 4 > e; e++) i[e] = q(i[e], f);
            var j = l(i);
            for (this.visibleTiles = {}, e = 0; e < j.length; e++) this.visibleTiles[[j[e][0], j[e][1], f]] = !0;
            for (var k in this.visibleTiles) a = k.split(","), b = a[0], c = a[1], this.tiles[k] || (a = this.tiles[k] = new this.tileClass(b, c, f, this.tileOptions, this.tiles), g.push({
                tile: this.tiles[k],
                dist: d([b, c], h)
            }));
            for (this.purge(), g.sort(function(a, b) {
                    return a.dist - b.dist
                }), e = 0; e < g.length; e++) a = g[e].tile, a.load(this.getURL(a.x, a.y, a.zoom))
        },
        purge: function() {
            var a, b, c = Math.round(B.zoom);
            for (var d in this.tiles) a = this.tiles[d], this.visibleTiles[d] || (this.fixedZoom ? (this.tiles[d].destroy(), delete this.tiles[d]) : a.zoom === c + 1 && (b = [a.x / 2 << 0, a.y / 2 << 0, c].join(","), this.visibleTiles[b]) || a.zoom === c - 1 && (this.visibleTiles[[2 * a.x, 2 * a.y, c].join(",")] || this.visibleTiles[[2 * a.x + 1, 2 * a.y, c].join(",")] || this.visibleTiles[[2 * a.x, 2 * a.y + 1, c].join(",")] || this.visibleTiles[[2 * a.x + 1, 2 * a.y + 1, c].join(",")]) || delete this.tiles[d])
        },
        destroy: function() {
            B.off("change", this._onChange), B.off("resize", this._onResize), clearTimeout(this.debounce);
            for (var a in this.tiles) this.tiles[a].destroy();
            this.tiles = []
        }
    };
    var W = {
            start: Date.now(),
            items: [],
            add: function(a, b, c) {
                c = c || 0;
                var d = this.items;
                for (k = 0, l = d.length; l > k; k++)
                    if (d[k].type === a && d[k].selector === b) return;
                d.push({
                    type: a,
                    selector: b,
                    duration: c
                });
                for (var e, f, g, h, i = this.time(), j = i + c, k = 0, l = X.Index.items.length; l > k; k++)
                    if (e = X.Index.items[k], e.applyFilter) {
                        for (g = 0, h = e.items.length; h > g; g++) f = e.items[g], b(f.id, f.data) && (f.filter = [i, j, f.filter ? f.filter[3] : 1, 0]);
                        e.applyFilter()
                    }
            },
            remove: function(a, b, c) {
                c = c || 0;
                var d, e, f = this.items;
                for (d = 0, e = f.length; e > d; d++)
                    if (f[d].type === a && f[d].selector === b) {
                        f.splice(d, 1);
                        break
                    }
                var g, h, i, j, k = this.time(),
                    l = k + c;
                for (d = 0, e = X.Index.items.length; e > d; d++)
                    if (g = X.Index.items[d], g.applyFilter) {
                        for (i = 0, j = g.items.length; j > i; i++) h = g.items[i], b(h.id, h.data) && (h.filter = [k, l, h.filter ? h.filter[3] : 0, 1]);
                        g.applyFilter()
                    }
            },
            apply: function(a) {
                var b, c, d, e, f, g = this.items;
                if (a.applyFilter) {
                    for (var h = 0, i = g.length; i > h; h++)
                        for (b = g[h].type, c = g[h].selector, e = 0, f = a.items.length; f > e; e++) d = a.items[e], c(d.id, d.data) && (d.filter = [0, 0, 0, 0]);
                    a.applyFilter()
                }
            },
            time: function() {
                return Date.now() - this.start
            },
            destroy: function() {
                this.items = []
            }
        },
        X = {
            Index: {
                items: [],
                add: function(a) {
                    this.items.push(a)
                },
                remove: function(a) {
                    for (var b = this.items, c = 0, d = b.length; d > c; c++)
                        if (b[c] === a) return void b.splice(c, 1)
                },
                destroy: function() {
                    this.items = []
                }
            }
        };
    X.Tile = function(a, b, c, d) {
        this.x = a, this.y = b, this.zoom = c, this.key = [a, b, c].join(","), this.options = d
    }, X.Tile.prototype = {
        load: function(a) {
            this.mesh = new Y.GeoJSON(a, this.options)
        },
        destroy: function() {
            this.mesh && this.mesh.destroy()
        }
    };
    var Y = {};
    Y.GeoJSON = function() {
        function a(b, d) {
            var e, g, h, i;
            switch (b.type) {
                case "GeometryCollection":
                    var j = [];
                    for (e = 0, g = b.geometries.length; g > e; e++)(i = a(b.geometries[e])) && j.push.apply(j, i);
                    return j;
                case "MultiPolygon":
                    var k = [];
                    for (e = 0, g = b.coordinates.length; g > e; e++)(i = a({
                        type: "Polygon",
                        coordinates: b.coordinates[e]
                    })) && k.push.apply(j, i);
                    return k;
                case "Polygon":
                    h = b.coordinates;
                    break;
                default:
                    return []
            }
            var l, m = [];
            for (e = 0, g = h.length; g > e; e++) l = e ? f(h[e]) ? h[e].reverse() : h[e] : f(h[e]) ? h[e] : h[e].reverse(), m[e] = c(l, d);
            return [m]
        }

        function c(a, c) {
            for (var d, e = [], f = 0, g = a.length; g > f; f++) d = b(a[f][1], a[f][0], i), e[f] = [d.x - c.x, d.y - c.y];
            return e
        }

        function d(a, b) {
            if (b = b || {}, this.id = b.id, this.color = b.color, this.replace = !!b.replace, this.scale = b.scale || 1, this.rotation = b.rotation || 0, this.elevation = b.elevation || 0, this.position = {}, this.minZoom = parseFloat(b.minZoom) || A.minZoom, this.maxZoom = parseFloat(b.maxZoom) || A.maxZoom, this.maxZoom < this.minZoom && (this.maxZoom = this.minZoom), this.data = {
                    vertices: [],
                    normals: [],
                    colors: [],
                    ids: []
                }, G.setBusy(), "object" == typeof a) {
                var c = a;
                this.onLoad(c)
            } else this.request = S.getJSON(a, function(a) {
                this.request = null, this.onLoad(a)
            }.bind(this))
        }
        var h = 16,
            i = H << h,
            j = 100,
            k = 66;
        return d.prototype = {
            onLoad: function(c) {
                if (c && c.features.length) {
                    var d = c.features[0].geometry.coordinates[0][0];
                    this.position = {
                        latitude: d[1],
                        longitude: d[0]
                    }, this.items = [];
                    var e = b(this.position.latitude, this.position.longitude, i),
                        f = 0,
                        g = c.features.length,
                        h = f + Math.min(g, j),
                        l = function() {
                            for (var b, d, i = f; h > i; i++) {
                                b = c.features[i], d = a(b.geometry, e);
                                for (var m = 0, n = d.length; n > m; m++) this.addItem(b.id, R.GeoJSON(b.properties), d[m])
                            }
                            return h === g ? void this.onReady() : (f = h, h = f + Math.min(g - f, j), void(this.relaxedProcessing = setTimeout(l, k)))
                        }.bind(this);
                    l()
                }
            },
            addItem: function(a, b, c) {
                a = this.id || b.relationId || a || b.id;
                var d, f, h, i, j = Z.Interaction.idToColor(a),
                    k = (a / 2 % 2 ? -1 : 1) * (a % 2 ? .03 : .06),
                    l = g(c[0]),
                    m = (l.maxX - l.minX) / 2,
                    n = [l.minX + (l.maxX - l.minX) / 2, l.minY + (l.maxY - l.minY) / 2];
                switch (b.roofShape) {
                    case "cone":
                    case "dome":
                    case "onion":
                    case "pyramid":
                    case "pyramidal":
                        b.height = Math.max(0, b.height - (b.roofHeight || 3));
                        break;
                    default:
                        b.roofHeight = 0
                }
                switch (h = 0, b.shape) {
                    case "cylinder":
                        h = U.cylinder(this.data, n, m, m, b.minHeight, b.height);
                        break;
                    case "cone":
                        h = U.cylinder(this.data, n, m, 0, b.minHeight, b.height), f = !0;
                        break;
                    case "dome":
                        h = U.dome(this.data, n, m, b.minHeight, b.height);
                        break;
                    case "sphere":
                        h = U.cylinder(this.data, n, m, m, b.minHeight, b.height);
                        break;
                    case "pyramid":
                    case "pyramidal":
                        h = U.cylinder(this.data, n, m, m, b.minHeight, b.height), f = !0;
                        break;
                    default:
                        h = e(c[0], l, n) ? U.cylinder(this.data, n, m, m, b.minHeight, b.height) : U.extrusion(this.data, c, b.minHeight, b.height)
                }
                for (i = new y(this.color || b.wallColor || K).toArray(), d = 0; h > d; d++) this.data.colors.push(i[0] + k, i[1] + k, i[2] + k), this.data.ids.push(j[0], j[1], j[2]);
                if (this.items.push({
                        id: a,
                        vertexCount: h,
                        data: b.data
                    }), !f) {
                    switch (h = 0, b.roofShape) {
                        case "cone":
                            h = U.cylinder(this.data, n, m, 0, b.height, b.height + b.roofHeight);
                            break;
                        case "dome":
                        case "onion":
                            h = U.dome(this.data, n, m, b.height, b.height + (b.roofHeight || m));
                            break;
                        case "pyramid":
                        case "pyramidal":
                            h = "cylinder" === b.shape ? U.cylinder(this.data, n, m, 0, b.height, b.height + b.roofHeight) : U.pyramid(this.data, c, n, b.height, b.height + b.roofHeight);
                            break;
                        default:
                            h = "cylinder" === b.shape ? U.circle(this.data, n, m, b.height) : U.polygon(this.data, c, b.height)
                    }
                    for (i = new y(this.color || b.roofColor || K).toArray(), d = 0; h > d; d++) this.data.colors.push(i[0] + k, i[1] + k, i[2] + k), this.data.ids.push(j[0], j[1], j[2]);
                    this.items.push({
                        id: a,
                        vertexCount: h,
                        data: b.data
                    })
                }
            },
            fadeIn: function() {
                for (var a, b = [], c = W.time() + 250, d = c + 500, e = 0, f = this.items.length; f > e; e++) {
                    a = this.items[e], a.filter = [c, d, 0, 1];
                    for (var g = 0, h = a.vertexCount; h > g; g++) b.push.apply(b, a.filter)
                }
                this.filterBuffer = new C.Buffer(4, new Float32Array(b))
            },
            applyFilter: function() {
                for (var a, b = [], c = 0, d = this.items.length; d > c; c++) {
                    a = this.items[c];
                    for (var e = 0, f = a.vertexCount; f > e; e++) b.push.apply(b, a.filter)
                }
                this.filterBuffer = new C.Buffer(4, new Float32Array(b))
            },
            onReady: function() {
                this.vertexBuffer = new C.Buffer(3, new Float32Array(this.data.vertices)), this.normalBuffer = new C.Buffer(3, new Float32Array(this.data.normals)), this.colorBuffer = new C.Buffer(3, new Float32Array(this.data.colors)), this.idBuffer = new C.Buffer(3, new Float32Array(this.data.ids)), this.fadeIn(), this.data = null, W.apply(this), X.Index.add(this), this.isReady = !0, G.setIdle()
            },
            getMatrix: function() {
                var a = new C.Matrix;
                this.elevation && a.translate(0, 0, this.elevation);
                var c = 1 / Math.pow(2, h - B.zoom) * this.scale;
                a.scale(c, c, c * J), this.rotation && a.rotateZ(-this.rotation);
                var d = b(this.position.latitude, this.position.longitude, H * Math.pow(2, B.zoom)),
                    e = B.center;
                return a.translate(d.x - e.x, d.y - e.y, 0), a
            },
            destroy: function() {
                this.isReady = !1, clearTimeout(this.relaxedProcessing), X.Index.remove(this), this.request && this.request.abort(), this.items = [], this.isReady && (this.vertexBuffer.destroy(), this.normalBuffer.destroy(), this.colorBuffer.destroy(), this.idBuffer.destroy())
            }
        }, d
    }(), Y.MapPlane = function() {
        function a(a) {
            a = a || {}, this.id = a.id, this.radius = a.radius || 1500, this.createGlGeometry(), this.minZoom = A.minZoom, this.maxZoom = A.maxZoom
        }
        return a.prototype = {
            createGlGeometry: function() {
                this.vertexBuffer = new C.Buffer(3, new Float32Array([-this.radius, -this.radius, 0, this.radius, this.radius, 0, this.radius, -this.radius, 0, this.radius, this.radius, 0, -this.radius, -this.radius, 0, -this.radius, this.radius, 0])), this.normalBuffer = new C.Buffer(3, new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]))
            },
            getMatrix: function() {
                var a = Z.fogRadius / this.radius,
                    b = new C.Matrix;
                return b.scale(a, a, a), b
            },
            destroy: function() {
                this.vertexBuffer.destroy(), this.normalBuffer.destroy(), this.colorBuffer.destroy(), this.idBuffer.destroy()
            }
        }, a
    }(), Y.DebugQuad = function() {
        function a(a) {
            a = a || {}, this.id = a.id, this.v1 = this.v2 = this.v3 = this.v4 = [!1, !1, !1], this.updateGeometry([0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]), this.minZoom = A.minZoom, this.maxZoom = A.maxZoom
        }

        function b(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
        }
        return a.prototype = {
            updateGeometry: function(a, c, d, e) {
                if (!(b(a, this.v1) && b(c, this.v2) && b(d, this.v3) && b(e, this.v4))) {
                    this.v1 = a, this.v2 = c, this.v3 = d, this.v4 = e, this.vertexBuffer && this.vertexBuffer.destroy();
                    var f = [].concat(a, c, d, a, d, e);
                    this.vertexBuffer = new C.Buffer(3, new Float32Array(f)), this.normalBuffer && this.normalBuffer.destroy(), this.normalBuffer = new C.Buffer(3, new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]));
                    var g = [1, .5, .25];
                    this.colorBuffer && this.colorBuffer.destroy(), this.colorBuffer = new C.Buffer(3, new Float32Array([].concat(g, g, g, g, g, g))), this.idBuffer && this.idBuffer.destroy(), this.idBuffer = new C.Buffer(3, new Float32Array([].concat(g, g, g, g, g, g)))
                }
            },
            getMatrix: function() {
                var a = new C.Matrix;
                return a
            },
            destroy: function() {
                this.vertexBuffer.destroy(), this.normalBuffer.destroy(), this.colorBuffer.destroy(), this.idBuffer.destroy()
            }
        }, a
    }(), Y.OBJ = function() {
        function a(a) {
            for (var b, d = a.split(/[\r\n]/g), e = {}, f = null, g = 0, h = d.length; h > g; g++) switch (b = d[g].trim().split(/\s+/), b[0]) {
                case "newmtl":
                    c(e, f), f = {
                        id: b[1],
                        color: {}
                    };
                    break;
                case "Kd":
                    f.color = [parseFloat(b[1]), parseFloat(b[2]), parseFloat(b[3])];
                    break;
                case "d":
                    f.color[3] = parseFloat(b[1])
            }
            return c(e, f), a = null, e
        }

        function c(a, b) {
            null !== b && (a[b.id] = b.color)
        }

        function d(a, b) {
            for (var c, d, f, g = a.split(/[\r\n]/g), i = [], j = [], k = 0, l = g.length; l > k; k++) switch (c = g[k].trim().split(/\s+/), c[0]) {
                case "g":
                case "o":
                    e(i, d, f, j), d = c[1], j = [];
                    break;
                case "usemtl":
                    e(i, d, f, j), b[c[1]] && (f = b[c[1]]), j = [];
                    break;
                case "v":
                    h.push([parseFloat(c[1]), parseFloat(c[2]), parseFloat(c[3])]);
                    break;
                case "f":
                    j.push([parseFloat(c[1]) - 1, parseFloat(c[2]) - 1, parseFloat(c[3]) - 1])
            }
            return e(i, d, f, j), a = null, i
        }

        function e(a, b, c, d) {
            if (d.length) {
                var e = f(d);
                a.push({
                    id: b,
                    color: c,
                    vertices: e.vertices,
                    normals: e.normals
                })
            }
        }

        function f(a) {
            for (var b, c, d, e, f, g, i, j = {
                    vertices: [],
                    normals: []
                }, k = 0, l = a.length; l > k; k++) b = h[a[k][0]], c = h[a[k][1]], d = h[a[k][2]], e = [c[0] - b[0], c[1] - b[1], c[2] - b[2]], f = [d[0] - b[0], d[1] - b[1], d[2] - b[2]], g = [e[1] * f[2] - e[2] * f[1], e[2] * f[0] - e[0] * f[2], e[0] * f[1] - e[1] * f[0]], i = Math.sqrt(g[0] * g[0] + g[1] * g[1] + g[2] * g[2]), g[0] /= i, g[1] /= i, g[2] /= i, j.vertices.push(b[0], b[2], b[1], c[0], c[2], c[1], d[0], d[2], d[1]), j.normals.push(g[0], g[1], g[2], g[0], g[1], g[2], g[0], g[1], g[2]);
            return j
        }

        function g(b, c, d) {
            d = d || {}, this.id = d.id, d.color && (this.color = new y(d.color).toArray()), this.replace = !!d.replace, this.scale = d.scale || 1, this.rotation = d.rotation || 0, this.elevation = d.elevation || 0, this.position = c, this.minZoom = parseFloat(d.minZoom) || A.minZoom, this.maxZoom = parseFloat(d.maxZoom) || A.maxZoom, this.maxZoom < this.minZoom && (this.maxZoom = this.minZoom), this.inMeters = H / (Math.cos(this.position.latitude * Math.PI / 180) * Q), this.data = {
                vertices: [],
                normals: [],
                colors: [],
                ids: []
            }, G.setBusy(), this.request = S.getText(b, function(c) {
                this.request = null;
                var d;
                (d = c.match(/^mtllib\s+(.*)$/m)) ? this.request = S.getText(b.replace(/[^\/]+$/, "") + d[1], function(b) {
                    this.request = null, this.onLoad(c, a(b))
                }.bind(this)): this.onLoad(c, null)
            }.bind(this))
        }
        var h = [];
        return g.prototype = {
            onLoad: function(a, b) {
                this.items = [], this.addItems(d(a, b)), this.onReady()
            },
            addItems: function(a) {
                for (var b, c, d, e, f, g, h, i = new y(K).toArray(), j = 0, k = a.length; k > j; j++) {
                    for (b = a[j], this.data.vertices = this.data.vertices.concat(b.vertices), this.data.normals = this.data.normals.concat(b.normals), g = this.id || b.id, d = Z.Interaction.idToColor(g), h = (g / 2 % 2 ? -1 : 1) * (g % 2 ? .03 : .06), c = this.color || b.color || i, e = 0, f = b.vertices.length - 2; f > e; e += 3) this.data.colors.push(c[0] + h, c[1] + h, c[2] + h), this.data.ids.push(d[0], d[1], d[2], 1);
                    this.items.push({
                        id: g,
                        vertexCount: b.vertices.length / 3,
                        data: b.data
                    })
                }
            },
            fadeIn: function() {
                for (var a, b = [], c = W.time() + 250, d = c + 500, e = 0, f = this.items.length; f > e; e++) {
                    a = this.items[e], a.filter = [c, d, 0, 1];
                    for (var g = 0, h = a.vertexCount; h > g; g++) b.push.apply(b, a.filter)
                }
                this.filterBuffer = new C.Buffer(4, new Float32Array(b))
            },
            applyFilter: function() {
                for (var a, b = [], c = 0, d = this.items.length; d > c; c++) {
                    a = this.items[c];
                    for (var e = 0, f = a.vertexCount; f > e; e++) b.push.apply(b, a.filter)
                }
                this.filterBuffer = new C.Buffer(4, new Float32Array(b))
            },
            onReady: function() {
                this.vertexBuffer = new C.Buffer(3, new Float32Array(this.data.vertices)), this.normalBuffer = new C.Buffer(3, new Float32Array(this.data.normals)), this.colorBuffer = new C.Buffer(3, new Float32Array(this.data.colors)), this.idBuffer = new C.Buffer(3, new Float32Array(this.data.ids)), this.fadeIn(), this.data = null, W.apply(this), X.Index.add(this), this.isReady = !0, G.setIdle()
            },
            getMatrix: function() {
                var a = new C.Matrix;
                this.elevation && a.translate(0, 0, this.elevation);
                var c = Math.pow(2, B.zoom) * this.inMeters * this.scale;
                a.scale(c, c, c), this.rotation && a.rotateZ(-this.rotation);
                var d = b(this.position.latitude, this.position.longitude, H * Math.pow(2, B.zoom)),
                    e = B.center;
                return a.translate(d.x - e.x, d.y - e.y, 0), a
            },
            destroy: function() {
                X.Index.remove(this), this.request && this.request.abort(), this.items = [], this.isReady && (this.vertexBuffer.destroy(), this.normalBuffer.destroy(), this.colorBuffer.destroy(), this.idBuffer.destroy())
            }
        }, g
    }();
    var Z = {
        getFramebufferConfig: function(a, b, c) {
            var d = {};
            return d.width = Math.min(C.util.nextPowerOf2(a), c), d.height = Math.min(C.util.nextPowerOf2(b), c), d.usedWidth = Math.min(a, d.width), d.usedHeight = Math.min(b, d.height), d.tcLeft = .5 / d.width, d.tcTop = .5 / d.height, d.tcRight = (d.usedWidth - .5) / d.width, d.tcBottom = (d.usedHeight - .5) / d.height, d
        },
        getViewQuad: function(a) {
            var b = 4e3,
                c = C.Matrix.invert(a),
                d = p(-1, -1, c),
                e = p(1, -1, c),
                f = p(1, 1, c),
                g = p(-1, 1, c);
            if (d && e) {
                var h, i, j, k;
                return g && f || (j = p(-1, -.9, c), h = v(r(j, d)), g = s(d, t(h, b)), k = p(1, -.9, c), i = v(r(k, e)), f = s(e, t(i, b))), w(d, g) > b && (h = v(r(g, d)), g = s(d, t(h, b))), w(e, f) > b && (i = v(r(f, e)), f = s(e, t(i, b))), [d, e, f, g]
            }
        },
        start: function() {
            this.viewMatrix = new C.Matrix, this.projMatrix = new C.Matrix, this.viewProjMatrix = new C.Matrix, B.on("change", this._onChange = this.onChange.bind(this)), this.onChange(), B.on("resize", this._onResize = this.onResize.bind(this)), this.onResize(), D.cullFace(D.BACK), D.enable(D.CULL_FACE), D.enable(D.DEPTH_TEST), Z.Interaction.init(), Z.SkyDome.init(), Z.Buildings.init(), Z.Basemap.init(), Z.HudRect.init(), Z.Overlay.init(), Z.NormalMap.init(), Z.DepthMap.init(), Z.AmbientMap.init(), Z.Blur.init(), this.loop = setInterval(function() {
                requestAnimationFrame(function() {
                    if (D.clearColor(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], 1), D.clear(D.COLOR_BUFFER_BIT | D.DEPTH_BUFFER_BIT), !(B.zoom < A.minZoom || B.zoom > A.maxZoom) && (Z.SkyDome.render(), Z.Buildings.render(), Z.Basemap.render(), "quality" === Z.optimize)) {
                        var a = this.getFramebufferConfig(B.width, B.height, D.getParameter(D.MAX_TEXTURE_SIZE));
                        Z.DepthMap.render(a), Z.AmbientMap.render(Z.DepthMap.framebuffer.renderTexture.id, a, .5), Z.Blur.render(Z.AmbientMap.framebuffer.renderTexture.id, a), D.blendFunc(D.ZERO, D.SRC_COLOR), D.enable(D.BLEND), Z.Overlay.render(Z.Blur.framebuffer.renderTexture.id, a), D.disable(D.BLEND)
                    }
                }.bind(this))
            }.bind(this), 17)
        },
        stop: function() {
            clearInterval(this.loop)
        },
        onChange: function() {
            this.viewMatrix = (new C.Matrix).rotateZ(B.rotation).rotateX(B.tilt), this.viewProjMatrix = new C.Matrix(C.Matrix.multiply(this.viewMatrix, this.projMatrix))
        },
        onResize: function() {
            var a = B.width,
                b = B.height,
                c = 1024,
                d = 45;
            this.projMatrix = (new C.Matrix).translate(0, -b / 2, -1220).scale(1, -1, 1).multiply(new C.Matrix.Perspective(d * b / c, a / b, .1, 5e3)).translate(0, -1, 0), C.context.canvas.width = a, C.context.canvas.height = b, C.context.viewport(0, 0, a, b), this.viewProjMatrix = new C.Matrix(C.Matrix.multiply(this.viewMatrix, this.projMatrix)), this.fogRadius = 1.1 * Math.sqrt(a * a + b * b)
        },
        destroy: function() {
            B.off("change", this._onChange), B.off("resize", this._onResize), this.stop(), Z.Interaction.destroy(), Z.SkyDome.destroy(), Z.Buildings.destroy(), Z.Basemap.destroy(), Z.HudRect.destroy(), Z.Overlay.destroy(), Z.NormalMap.destroy(), Z.DepthMap.destroy(), Z.AmbientMap.destroy(), Z.Blur.destroy()
        }
    };
    Z.Interaction = {
        idMapping: [null],
        viewportSize: 512,
        init: function() {
            this.shader = new C.Shader({
                vertexShader: T.interaction.vertex,
                fragmentShader: T.interaction.fragment,
                attributes: ["aPosition", "aID", "aFilter"],
                uniforms: ["uModelMatrix", "uViewMatrix", "uProjMatrix", "uMatrix", "uFogRadius", "uBendRadius", "uBendDistance", "uTime"]
            }), this.framebuffer = new C.Framebuffer(this.viewportSize, this.viewportSize)
        },
        getTarget: function(a, b) {
            var c = this.shader,
                d = this.framebuffer;
            D.viewport(0, 0, this.viewportSize, this.viewportSize), c.enable(), d.enable(), D.clearColor(0, 0, 0, 1), D.clear(D.COLOR_BUFFER_BIT | D.DEPTH_BUFFER_BIT), D.uniform1f(c.uniforms.uFogRadius, Z.fogRadius), D.uniform1f(c.uniforms.uBendRadius, Z.bendRadius), D.uniform1f(c.uniforms.uBendDistance, Z.bendDistance), D.uniform1f(c.uniforms.uTime, W.time()), D.uniformMatrix4fv(c.uniforms.uViewMatrix, !1, Z.viewMatrix.data), D.uniformMatrix4fv(c.uniforms.uProjMatrix, !1, Z.projMatrix.data);
            for (var e, f, g = X.Index.items, h = 0, i = g.length; i > h; h++) e = g[h], B.zoom < e.minZoom || B.zoom > e.maxZoom || (f = e.getMatrix()) && (D.uniformMatrix4fv(c.uniforms.uModelMatrix, !1, f.data), D.uniformMatrix4fv(c.uniforms.uMatrix, !1, C.Matrix.multiply(f, Z.viewProjMatrix)), e.vertexBuffer.enable(), D.vertexAttribPointer(c.attributes.aPosition, e.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), e.idBuffer.enable(), D.vertexAttribPointer(c.attributes.aID, e.idBuffer.itemSize, D.FLOAT, !1, 0, 0), e.filterBuffer.enable(), D.vertexAttribPointer(c.attributes.aFilter, e.filterBuffer.itemSize, D.FLOAT, !1, 0, 0), D.drawArrays(D.TRIANGLES, 0, e.vertexBuffer.numItems));
            var j = d.getData();
            c.disable(), d.disable(), D.viewport(0, 0, B.width, B.height), a = a / B.width * this.viewportSize << 0, b = b / B.height * this.viewportSize << 0;
            var k = 4 * ((this.viewportSize - b) * this.viewportSize + a),
                l = j[k] | j[k + 1] << 8 | j[k + 2] << 16;
            return this.idMapping[l]
        },
        idToColor: function(a) {
            var b = this.idMapping.indexOf(a);
            return -1 === b && (this.idMapping.push(a), b = this.idMapping.length - 1), [(255 & b) / 255, (b >> 8 & 255) / 255, (b >> 16 & 255) / 255]
        },
        destroy: function() {}
    }, Z.SkyDome = {
        init: function() {
            var a = this.createGeometry(this.baseRadius);
            this.vertexBuffer = new C.Buffer(3, new Float32Array(a.vertices)), this.texCoordBuffer = new C.Buffer(2, new Float32Array(a.texCoords)), this.shader = new C.Shader({
                vertexShader: T.skydome.vertex,
                fragmentShader: T.skydome.fragment,
                attributes: ["aPosition", "aTexCoord"],
                uniforms: ["uModelMatrix", "uViewMatrix", "uProjMatrix", "uMatrix", "uTexIndex", "uFogColor", "uBendRadius", "uBendDistance"]
            }), G.setBusy();
            var b = A.baseURL + "/skydome.jpg";
            this.texture = (new C.texture.Image).load(b, function(a) {
                G.setIdle(), a && (this.isReady = !0)
            }.bind(this))
        },
        baseRadius: 500,
        createGeometry: function(a) {
            for (var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = 8, t = 24, u = [], v = [], w = Math.sin, x = Math.cos, y = Math.PI, z = 0; t > z; z++)
                for (n = z / t, b = 2 * n * y, c = x(b) * a, d = w(b) * a, o = (z + 1) / t, e = 2 * o * y, f = x(e) * a, g = w(e) * a, r = 0; s > r; r++) h = r * y / (2 * s), i = (r + 1) * y / (2 * s), j = [c * x(h), d * x(h), a * w(h)], k = [f * x(h), g * x(h), a * w(h)], l = [f * x(i), g * x(i), a * w(i)], m = [c * x(i), d * x(i), a * w(i)], u.push.apply(u, j), u.push.apply(u, k), u.push.apply(u, l), u.push.apply(u, j), u.push.apply(u, l), u.push.apply(u, m), p = 1 - (r + 1) / s, q = 1 - r / s, v.push(n, q, o, q, o, p, n, q, o, p, n, p);
            return {
                vertices: u,
                texCoords: v
            }
        },
        render: function() {
            if (this.isReady) {
                var a = Z.fogColor,
                    b = this.shader;
                b.enable(), D.uniform3fv(b.uniforms.uFogColor, a), D.uniform1f(b.uniforms.uBendRadius, Z.bendRadius), D.uniform1f(b.uniforms.uBendDistance, Z.bendDistance);
                var c = new C.Matrix,
                    d = Z.fogRadius / this.baseRadius;
                c.scale(d, d, d), D.uniformMatrix4fv(b.uniforms.uModelMatrix, !1, c.data), D.uniformMatrix4fv(b.uniforms.uViewMatrix, !1, Z.viewMatrix.data), D.uniformMatrix4fv(b.uniforms.uProjMatrix, !1, Z.projMatrix.data), D.uniformMatrix4fv(b.uniforms.uMatrix, !1, C.Matrix.multiply(c, Z.viewProjMatrix)), this.vertexBuffer.enable(), D.vertexAttribPointer(b.attributes.aPosition, this.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), this.texCoordBuffer.enable(), D.vertexAttribPointer(b.attributes.aTexCoord, this.texCoordBuffer.itemSize, D.FLOAT, !1, 0, 0), D.uniform1i(b.uniforms.uTexIndex, 0), this.texture.enable(0), D.drawArrays(D.TRIANGLES, 0, this.vertexBuffer.numItems), b.disable()
            }
        },
        destroy: function() {
            this.texture.destroy()
        }
    }, Z.Buildings = {
        init: function() {
            this.shader = new C.Shader({
                vertexShader: T.buildings.vertex,
                fragmentShader: T.buildings.fragment,
                attributes: ["aPosition", "aColor", "aFilter", "aNormal", "aID"],
                uniforms: ["uModelMatrix", "uViewMatrix", "uProjMatrix", "uMatrix", "uNormalTransform", "uAlpha", "uLightColor", "uLightDirection", "uFogRadius", "uFogColor", "uBendRadius", "uBendDistance", "uHighlightColor", "uHighlightID", "uTime"]
            })
        },
        render: function(a, b) {
            var c = this.shader;
            c.enable(), this.showBackfaces && D.disable(D.CULL_FACE), D.uniform3fv(c.uniforms.uLightColor, [.5, .5, .5]), D.uniform3fv(c.uniforms.uLightDirection, n(1, 1, 1));
            var d = C.Matrix.invert3((new C.Matrix).data);
            D.uniformMatrix3fv(c.uniforms.uNormalTransform, !1, C.Matrix.transpose(d)), D.uniform1f(c.uniforms.uFogRadius, Z.fogRadius), D.uniform3fv(c.uniforms.uFogColor, Z.fogColor), D.uniform1f(c.uniforms.uBendRadius, Z.bendRadius), D.uniform1f(c.uniforms.uBendDistance, Z.bendDistance), D.uniform3fv(c.uniforms.uHighlightColor, Z.highlightColor), D.uniform1f(c.uniforms.uTime, W.time()), this.highlightID || (this.highlightID = [0, 0, 0]), D.uniform3fv(c.uniforms.uHighlightID, this.highlightID), D.uniformMatrix4fv(c.uniforms.uViewMatrix, !1, Z.viewMatrix.data), D.uniformMatrix4fv(c.uniforms.uProjMatrix, !1, Z.projMatrix.data);
            for (var e, f, g = X.Index.items, h = 0, i = g.length; i > h; h++) e = g[h], B.zoom < e.minZoom || B.zoom > e.maxZoom || (f = e.getMatrix()) && (D.uniformMatrix4fv(c.uniforms.uModelMatrix, !1, f.data), D.uniformMatrix4fv(c.uniforms.uMatrix, !1, C.Matrix.multiply(f, Z.viewProjMatrix)), e.vertexBuffer.enable(), D.vertexAttribPointer(c.attributes.aPosition, e.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), e.normalBuffer.enable(), D.vertexAttribPointer(c.attributes.aNormal, e.normalBuffer.itemSize, D.FLOAT, !1, 0, 0), e.colorBuffer.enable(), D.vertexAttribPointer(c.attributes.aColor, e.colorBuffer.itemSize, D.FLOAT, !1, 0, 0), e.filterBuffer.enable(), D.vertexAttribPointer(c.attributes.aFilter, e.filterBuffer.itemSize, D.FLOAT, !1, 0, 0), e.idBuffer.enable(), D.vertexAttribPointer(c.attributes.aID, e.idBuffer.itemSize, D.FLOAT, !1, 0, 0), D.drawArrays(D.TRIANGLES, 0, e.vertexBuffer.numItems));
            this.showBackfaces && D.enable(D.CULL_FACE), c.disable()
        },
        destroy: function() {}
    }, Z.Basemap = {
        init: function() {
            this.shader = new C.Shader({
                vertexShader: T.basemap.vertex,
                fragmentShader: T.basemap.fragment,
                attributes: ["aPosition", "aTexCoord"],
                uniforms: ["uModelMatrix", "uViewMatrix", "uProjMatrix", "uMatrix", "uTexIndex", "uFogRadius", "uFogColor", "uBendRadius", "uBendDistance"]
            })
        },
        render: function() {
            var a = A._basemapGrid;
            if (a && !(B.zoom < a.minZoom || B.zoom > a.maxZoom)) {
                var b, c = this.shader,
                    d = Math.round(B.zoom);
                c.enable(), D.uniform1f(c.uniforms.uFogRadius, Z.fogRadius), D.uniform3fv(c.uniforms.uFogColor, Z.fogColor), D.uniform1f(c.uniforms.uBendRadius, Z.bendRadius), D.uniform1f(c.uniforms.uBendDistance, Z.bendDistance);
                for (var e in a.visibleTiles)
                    if (b = a.tiles[e], b && b.isReady) this.renderTile(b, c);
                    else {
                        var f = [b.x / 2 << 0, b.y / 2 << 0, d - 1].join(",");
                        if (a.tiles[f] && a.tiles[f].isReady) this.renderTile(a.tiles[f], c);
                        else
                            for (var g = [
                                    [2 * b.x, 2 * b.y, b.zoom + 1].join(","), [2 * b.x + 1, 2 * b.y, b.zoom + 1].join(","), [2 * b.x, 2 * b.y + 1, b.zoom + 1].join(","), [2 * b.x + 1, 2 * b.y + 1, b.zoom + 1].join(",")
                                ], h = 0; 4 > h; h++) a.tiles[g[h]] && a.tiles[g[h]].isReady && this.renderTile(a.tiles[g[h]], c)
                    }
                c.disable()
            }
        },
        renderTile: function(a, b) {
            var c = B.center,
                d = 1 / Math.pow(2, a.zoom - B.zoom),
                e = new C.Matrix;
            e.scale(d, d, 1), e.translate(a.x * H * d - c.x, a.y * H * d - c.y, 0), D.uniformMatrix4fv(b.uniforms.uModelMatrix, !1, e.data), D.uniformMatrix4fv(b.uniforms.uViewMatrix, !1, Z.viewMatrix.data), D.uniformMatrix4fv(b.uniforms.uProjMatrix, !1, Z.projMatrix.data), D.uniformMatrix4fv(b.uniforms.uMatrix, !1, C.Matrix.multiply(e, Z.viewProjMatrix)), a.vertexBuffer.enable(), D.vertexAttribPointer(b.attributes.aPosition, a.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), a.texCoordBuffer.enable(), D.vertexAttribPointer(b.attributes.aTexCoord, a.texCoordBuffer.itemSize, D.FLOAT, !1, 0, 0), D.uniform1i(b.uniforms.uTexIndex, 0), a.texture.enable(0), D.drawArrays(D.TRIANGLE_STRIP, 0, a.vertexBuffer.numItems)
        },
        destroy: function() {}
    }, Z.HudRect = {
        init: function() {
            var a = this.createGeometry();
            this.vertexBuffer = new C.Buffer(3, new Float32Array(a.vertices)), this.texCoordBuffer = new C.Buffer(2, new Float32Array(a.texCoords)), this.shader = new C.Shader({
                vertexShader: T.texture.vertex,
                fragmentShader: T.texture.fragment,
                attributes: ["aPosition", "aTexCoord"],
                uniforms: ["uMatrix", "uTexIndex", "uColor"]
            })
        },
        createGeometry: function() {
            var a = [],
                b = [];
            return a.push(0, 0, 1e-5, 1, 0, 1e-5, 1, 1, 1e-5), a.push(0, 0, 1e-5, 1, 1, 1e-5, 0, 1, 1e-5), b.push(.5, .5, 1, .5, 1, 1), b.push(.5, .5, 1, 1, .5, 1), {
                vertices: a,
                texCoords: b
            }
        },
        render: function(a) {
            var b = this.shader;
            b.enable();
            var c = new C.Matrix;
            D.uniformMatrix4fv(b.uniforms.uMatrix, !1, c.data), this.vertexBuffer.enable(), D.vertexAttribPointer(b.attributes.aPosition, this.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), this.texCoordBuffer.enable(), D.vertexAttribPointer(b.attributes.aTexCoord, this.texCoordBuffer.itemSize, D.FLOAT, !1, 0, 0), D.bindTexture(D.TEXTURE_2D, a), D.activeTexture(D.TEXTURE0), D.uniform1i(b.uniforms.uTexIndex, 0), D.drawArrays(D.TRIANGLES, 0, this.vertexBuffer.numItems), b.disable()
        },
        destroy: function() {}
    }, Z.NormalMap = {
        viewportSize: 512,
        init: function() {
            this.shader = new C.Shader({
                vertexShader: T.normalmap.vertex,
                fragmentShader: T.normalmap.fragment,
                attributes: ["aPosition", "aNormal", "aFilter"],
                uniforms: ["uMatrix", "uTime"]
            }), this.framebuffer = new C.Framebuffer(this.viewportSize, this.viewportSize), D.bindTexture(D.TEXTURE_2D, this.framebuffer.renderTexture.id), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MIN_FILTER, D.LINEAR_MIPMAP_NEAREST), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MAG_FILTER, D.LINEAR), this.mapPlane = new Y.MapPlane
        },
        render: function() {
            var a = this.shader,
                b = this.framebuffer;
            D.viewport(0, 0, this.viewportSize, this.viewportSize), a.enable(), b.enable(), D.clearColor(.5, .5, 1, 1), D.clear(D.COLOR_BUFFER_BIT | D.DEPTH_BUFFER_BIT), D.uniform1f(a.uniforms.uTime, W.time());
            for (var c, d, e = X.Index.items.concat([this.mapPlane]), f = 0, g = e.length; g > f; f++) c = e[f], B.zoom < c.minZoom || B.zoom > c.maxZoom || (d = c.getMatrix()) && (D.uniformMatrix4fv(a.uniforms.uMatrix, !1, C.Matrix.multiply(d, Z.viewProjMatrix)), c.vertexBuffer.enable(), D.vertexAttribPointer(a.attributes.aPosition, c.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), c.normalBuffer.enable(), D.vertexAttribPointer(a.attributes.aNormal, c.normalBuffer.itemSize, D.FLOAT, !1, 0, 0), c.filterBuffer.enable(), D.vertexAttribPointer(a.attributes.aFilter, c.filterBuffer.itemSize, D.FLOAT, !1, 0, 0), D.drawArrays(D.TRIANGLES, 0, c.vertexBuffer.numItems));
            a.disable(), b.disable(), D.bindTexture(D.TEXTURE_2D, this.framebuffer.renderTexture.id), D.generateMipmap(D.TEXTURE_2D), D.viewport(0, 0, B.width, B.height)
        },
        destroy: function() {}
    }, Z.DepthMap = {
        init: function() {
            this.shader = new C.Shader({
                vertexShader: T.depth.vertex,
                fragmentShader: T.depth.fragment,
                attributes: ["aPosition", "aFilter"],
                uniforms: ["uMatrix", "uModelMatrix", "uFogRadius", "uTime"]
            }), this.framebuffer = new C.Framebuffer(128, 128), this.mapPlane = new Y.MapPlane
        },
        render: function(a) {
            var b = this.shader,
                c = this.framebuffer;
            (c.width != a.width || c.height != a.height) && (c.setSize(a.width, a.height), D.bindTexture(D.TEXTURE_2D, this.framebuffer.renderTexture.id), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_WRAP_S, D.CLAMP_TO_EDGE), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_WRAP_T, D.CLAMP_TO_EDGE), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MIN_FILTER, D.NEAREST), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MAG_FILTER, D.NEAREST)), D.viewport(0, 0, a.usedWidth, a.usedHeight), b.enable(), c.enable(), D.clearColor(0, 0, 0, 1), D.clear(D.COLOR_BUFFER_BIT | D.DEPTH_BUFFER_BIT);
            var d, e;
            D.uniform1f(b.uniforms.uTime, W.time()), D.uniform1f(b.uniforms.uFogRadius, Z.fogRadius);
            for (var f = X.Index.items, g = 0; g < f.length; g++) d = f[g], B.zoom < d.minZoom || B.zoom > d.maxZoom || (e = d.getMatrix()) && (D.uniformMatrix4fv(b.uniforms.uMatrix, !1, C.Matrix.multiply(e, Z.viewProjMatrix)), D.uniformMatrix4fv(b.uniforms.uModelMatrix, !1, e.data), d.vertexBuffer.enable(), D.vertexAttribPointer(b.attributes.aPosition, d.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), d.filterBuffer.enable(), D.vertexAttribPointer(b.attributes.aFilter, d.filterBuffer.itemSize, D.FLOAT, !1, 0, 0), D.drawArrays(D.TRIANGLES, 0, d.vertexBuffer.numItems));
            b.disable(), c.disable(), D.viewport(0, 0, B.width, B.height)
        },
        destroy: function() {}
    }, Z.AmbientMap = {
        init: function() {
            this.shader = new C.Shader({
                vertexShader: T.ambientFromDepth.vertex,
                fragmentShader: T.ambientFromDepth.fragment,
                attributes: ["aPosition", "aTexCoord"],
                uniforms: ["uMatrix", "uInverseTexWidth", "uInverseTexHeight", "uTexIndex", "uEffectStrength"]
            }), this.framebuffer = new C.Framebuffer(128, 128), this.vertexBuffer = new C.Buffer(3, new Float32Array([-1, -1, 1e-5, 1, -1, 1e-5, 1, 1, 1e-5, -1, -1, 1e-5, 1, 1, 1e-5, -1, 1, 1e-5])), this.texCoordBuffer = new C.Buffer(2, new Float32Array([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]))
        },
        render: function(a, b, c) {
            var d = this.shader,
                e = this.framebuffer;
            void 0 === c && (c = 1), (e.width != b.width || e.height != b.height) && (e.setSize(b.width, b.height), D.bindTexture(D.TEXTURE_2D, this.framebuffer.renderTexture.id), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MIN_FILTER, D.NEAREST), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MAG_FILTER, D.NEAREST)), (b.tcRight != this.tcRight || b.tcTop != this.tcTop || b.tcLeft != this.tcLeft || b.tcBottom != this.tcBottom) && (this.texCoordBuffer.destroy(), this.texCoordBuffer = new C.Buffer(2, new Float32Array([b.tcLeft, b.tcTop, b.tcRight, b.tcTop, b.tcRight, b.tcBottom, b.tcLeft, b.tcTop, b.tcRight, b.tcBottom, b.tcLeft, b.tcBottom])), this.tcRight = b.tcRight, this.tcBottom = b.tcBottom, this.tcLeft = b.tcLeft, this.tcTop = b.tcTop), D.viewport(0, 0, b.usedWidth, b.usedHeight), d.enable(), e.enable(), D.clearColor(1, 0, 0, 1), D.clear(D.COLOR_BUFFER_BIT | D.DEPTH_BUFFER_BIT);
            var f = new C.Matrix;
            D.uniformMatrix4fv(d.uniforms.uMatrix, !1, f.data), D.uniform1f(d.uniforms.uInverseTexWidth, 1 / b.width), D.uniform1f(d.uniforms.uInverseTexHeight, 1 / b.height), D.uniform1f(d.uniforms.uEffectStrength, c), this.vertexBuffer.enable(), D.vertexAttribPointer(d.attributes.aPosition, this.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), this.texCoordBuffer.enable(), D.vertexAttribPointer(d.attributes.aTexCoord, this.texCoordBuffer.itemSize, D.FLOAT, !1, 0, 0), D.bindTexture(D.TEXTURE_2D, a), D.activeTexture(D.TEXTURE0), D.uniform1i(d.uniforms.uTexIndex, 0), D.drawArrays(D.TRIANGLES, 0, this.vertexBuffer.numItems), d.disable(), e.disable(), D.bindTexture(D.TEXTURE_2D, this.framebuffer.renderTexture.id), D.viewport(0, 0, B.width, B.height)
        },
        destroy: function() {}
    }, Z.Overlay = {
        init: function() {
            var a = this.createGeometry();
            this.vertexBuffer = new C.Buffer(3, new Float32Array(a.vertices)), this.texCoordBuffer = new C.Buffer(2, new Float32Array(a.texCoords)), this.shader = new C.Shader({
                vertexShader: T.texture.vertex,
                fragmentShader: T.texture.fragment,
                attributes: ["aPosition", "aTexCoord"],
                uniforms: ["uMatrix", "uTexIndex", "uColor"]
            })
        },
        createGeometry: function() {
            var a = [],
                b = [];
            return a.push(-1, -1, 1e-5, 1, -1, 1e-5, 1, 1, 1e-5), a.push(-1, -1, 1e-5, 1, 1, 1e-5, -1, 1, 1e-5), b.push(0, 0, 1, 0, 1, 1), b.push(0, 0, 1, 1, 0, 1), {
                vertices: a,
                texCoords: b
            }
        },
        render: function(a, b) {
            var c, d, e, f;
            void 0 !== b ? (c = 0 / b.width, e = (b.usedWidth - 1) / b.width, d = 0 / b.height, f = (b.usedHeight - 1) / b.height) : (c = d = 0, e = f = 1), (c != this.tcHorizMin || e != this.tcHorizMax || d != this.tcVertMin || f != this.tcVertMax) && (this.texCoordBuffer.destroy(), this.texCoordBuffer = new C.Buffer(2, new Float32Array([c, d, e, d, e, f, c, d, e, f, c, f])), this.tcHorizMin = c, this.tcHorizMax = e, this.tcVertMin = d, this.tcVertMax = f);
            var g = this.shader;
            g.enable();
            var h = new C.Matrix;
            D.uniformMatrix4fv(g.uniforms.uMatrix, !1, h.data), this.vertexBuffer.enable(), D.vertexAttribPointer(g.attributes.aPosition, this.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), this.texCoordBuffer.enable(), D.vertexAttribPointer(g.attributes.aTexCoord, this.texCoordBuffer.itemSize, D.FLOAT, !1, 0, 0), D.bindTexture(D.TEXTURE_2D, a), D.activeTexture(D.TEXTURE0), D.uniform1i(g.uniforms.uTexIndex, 0), D.drawArrays(D.TRIANGLES, 0, this.vertexBuffer.numItems), g.disable()
        },
        destroy: function() {}
    }, Z.Blur = {
        init: function() {
            this.shader = new C.Shader({
                vertexShader: T.blur.vertex,
                fragmentShader: T.blur.fragment,
                attributes: ["aPosition", "aTexCoord"],
                uniforms: ["uMatrix", "uInverseTexWidth", "uInverseTexHeight", "uTexIndex"]
            }), this.framebuffer = new C.Framebuffer(128, 128), this.vertexBuffer = new C.Buffer(3, new Float32Array([-1, -1, 1e-5, 1, -1, 1e-5, 1, 1, 1e-5, -1, -1, 1e-5, 1, 1, 1e-5, -1, 1, 1e-5])), this.texCoordBuffer = new C.Buffer(2, new Float32Array([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]))
        },
        render: function(a, b) {
            var c = this.shader,
                d = this.framebuffer;
            (d.width != b.width || d.height != b.height) && (d.setSize(b.width, b.height), D.bindTexture(D.TEXTURE_2D, this.framebuffer.renderTexture.id), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MIN_FILTER, D.NEAREST), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MAG_FILTER, D.NEAREST)), (b.tcRight != this.tcRight || b.tcTop != this.tcTop || b.tcLeft != this.tcLeft || b.tcBottom != this.tcBottom) && (this.texCoordBuffer.destroy(), this.texCoordBuffer = new C.Buffer(2, new Float32Array([b.tcLeft, b.tcTop, b.tcRight, b.tcTop, b.tcRight, b.tcBottom, b.tcLeft, b.tcTop, b.tcRight, b.tcBottom, b.tcLeft, b.tcBottom])), this.tcRight = b.tcRight, this.tcBottom = b.tcBottom, this.tcLeft = b.tcLeft, this.tcTop = b.tcTop), D.viewport(0, 0, b.usedWidth, b.usedHeight), c.enable(), d.enable(), D.clearColor(1, 0, 0, 1), D.clear(D.COLOR_BUFFER_BIT | D.DEPTH_BUFFER_BIT);
            var e = new C.Matrix;
            D.uniformMatrix4fv(c.uniforms.uMatrix, !1, e.data), D.uniform1f(c.uniforms.uInverseTexWidth, 1 / d.width), D.uniform1f(c.uniforms.uInverseTexHeight, 1 / d.height), this.vertexBuffer.enable(), D.vertexAttribPointer(c.attributes.aPosition, this.vertexBuffer.itemSize, D.FLOAT, !1, 0, 0), this.texCoordBuffer.enable(), D.vertexAttribPointer(c.attributes.aTexCoord, this.texCoordBuffer.itemSize, D.FLOAT, !1, 0, 0), D.bindTexture(D.TEXTURE_2D, a), D.activeTexture(D.TEXTURE0), D.uniform1i(c.uniforms.uTexIndex, 0), D.drawArrays(D.TRIANGLES, 0, this.vertexBuffer.numItems), c.disable(), d.disable(), D.bindTexture(D.TEXTURE_2D, this.framebuffer.renderTexture.id), D.viewport(0, 0, B.width, B.height)
        },
        destroy: function() {}
    };
    var $ = {};
    $.Tile = function(a, b, c) {
        this.x = a, this.y = b, this.zoom = c, this.key = [a, b, c].join(",");
        for (var d = 4, e = 256 / d, f = 1 / d, g = [], h = [], i = 0; d > i; i++)
            for (var j = 0; d > j; j++) g.push((i + 1) * e, (j + 1) * e, 0, (i + 1) * e, (j + 0) * e, 0, (i + 0) * e, (j + 1) * e, 0, (i + 0) * e, (j + 0) * e, 0), h.push((i + 1) * f, (j + 1) * f, (i + 1) * f, (j + 0) * f, (i + 0) * f, (j + 1) * f, (i + 0) * f, (j + 0) * f);
        this.vertexBuffer = new C.Buffer(3, new Float32Array(g)), this.texCoordBuffer = new C.Buffer(2, new Float32Array(h))
    }, $.Tile.prototype = {
        load: function(a) {
            G.setBusy(), this.texture = (new C.texture.Image).load(a, function(a) {
                G.setIdle(), a && (this.isReady = !0, D.bindTexture(D.TEXTURE_2D, this.texture.id), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_WRAP_S, D.CLAMP_TO_EDGE), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_WRAP_T, D.CLAMP_TO_EDGE))
            }.bind(this))
        },
        destroy: function() {
            this.vertexBuffer.destroy(), this.texCoordBuffer.destroy(), this.texture && this.texture.destroy()
        }
    }
}(this);
