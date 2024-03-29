/* */ 
"format cjs";
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";
  var _numExp = /(\d|\.)+/g,
      _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
      _colorLookup = {
        aqua: [0, 255, 255],
        lime: [0, 255, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, 255],
        navy: [0, 0, 128],
        white: [255, 255, 255],
        fuchsia: [255, 0, 255],
        olive: [128, 128, 0],
        yellow: [255, 255, 0],
        orange: [255, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [255, 0, 0],
        pink: [255, 192, 203],
        cyan: [0, 255, 255],
        transparent: [255, 255, 255, 0]
      },
      _hue = function(h, m1, m2) {
        h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
        return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
      },
      _parseColor = function(v, toHSL) {
        var a,
            r,
            g,
            b,
            h,
            s,
            l,
            max,
            min,
            d,
            wasHSL;
        if (!v) {
          a = _colorLookup.black;
        } else if (typeof(v) === "number") {
          a = [v >> 16, (v >> 8) & 255, v & 255];
        } else {
          if (v.charAt(v.length - 1) === ",") {
            v = v.substr(0, v.length - 1);
          }
          if (_colorLookup[v]) {
            a = _colorLookup[v];
          } else if (v.charAt(0) === "#") {
            if (v.length === 4) {
              r = v.charAt(1);
              g = v.charAt(2);
              b = v.charAt(3);
              v = "#" + r + r + g + g + b + b;
            }
            v = parseInt(v.substr(1), 16);
            a = [v >> 16, (v >> 8) & 255, v & 255];
          } else if (v.substr(0, 3) === "hsl") {
            a = wasHSL = v.match(_numExp);
            if (!toHSL) {
              h = (Number(a[0]) % 360) / 360;
              s = Number(a[1]) / 100;
              l = Number(a[2]) / 100;
              g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
              r = l * 2 - g;
              if (a.length > 3) {
                a[3] = Number(v[3]);
              }
              a[0] = _hue(h + 1 / 3, r, g);
              a[1] = _hue(h, r, g);
              a[2] = _hue(h - 1 / 3, r, g);
            } else if (v.indexOf("=") !== -1) {
              return v.match(_relNumExp);
            }
          } else {
            a = v.match(_numExp) || _colorLookup.transparent;
          }
          a[0] = Number(a[0]);
          a[1] = Number(a[1]);
          a[2] = Number(a[2]);
          if (a.length > 3) {
            a[3] = Number(a[3]);
          }
        }
        if (toHSL && !wasHSL) {
          r = a[0] / 255;
          g = a[1] / 255;
          b = a[2] / 255;
          max = Math.max(r, g, b);
          min = Math.min(r, g, b);
          l = (max + min) / 2;
          if (max === min) {
            h = s = 0;
          } else {
            d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
            h *= 60;
          }
          a[0] = (h + 0.5) | 0;
          a[1] = (s * 100 + 0.5) | 0;
          a[2] = (l * 100 + 0.5) | 0;
        }
        return a;
      },
      _formatColors = function(s, toHSL) {
        var colors = (s + "").match(_colorExp) || [],
            charIndex = 0,
            parsed = colors.length ? "" : s,
            i,
            color,
            temp;
        for (i = 0; i < colors.length; i++) {
          color = colors[i];
          temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
          charIndex += temp.length + color.length;
          color = _parseColor(color, toHSL);
          if (color.length === 3) {
            color.push(1);
          }
          parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
        }
        return parsed + s.substr(charIndex);
      },
      p,
      _colorStringFilter,
      TweenLite = _gsScope.TweenLite,
      _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",
      ColorPropsPlugin = _gsScope._gsDefine.plugin({
        propName: "colorProps",
        version: "1.5.0",
        priority: -1,
        API: 2,
        global: true,
        init: function(target, value, tween, index) {
          var p,
              proxy,
              pt,
              val;
          this._target = target;
          this._proxy = proxy = ((value.format + "").toUpperCase() === "NUMBER") ? {} : 0;
          for (p in value) {
            if (p !== "format") {
              if (proxy) {
                this._firstNumPT = pt = {
                  _next: this._firstNumPT,
                  t: target,
                  p: p,
                  f: (typeof(target[p]) === "function")
                };
                proxy[p] = "rgb(" + _parseColor(!pt.f ? target[p] : target[((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3))]()).join(",") + ")";
                val = value[p];
                if (typeof(val) === "function") {
                  val = val(index, target);
                }
                this._addTween(proxy, p, "get", ((typeof(val) === "number") ? "rgb(" + _parseColor(val, false).join(",") + ")" : val), p, null, null, _colorStringFilter);
              } else {
                this._addTween(target, p, "get", value[p], p, null, null, _colorStringFilter, index);
              }
            }
          }
          return true;
        },
        set: function(v) {
          var pt = this._firstNumPT,
              val;
          this._super.setRatio.call(this, v);
          while (pt) {
            val = _parseColor(this._proxy[pt.p], false);
            val = val[0] << 16 | val[1] << 8 | val[2];
            if (pt.f) {
              this._target[pt.p](val);
            } else {
              this._target[pt.p] = val;
            }
            pt = pt._next;
          }
        }
      });
  for (p in _colorLookup) {
    _colorExp += "|" + p + "\\b";
  }
  _colorExp = new RegExp(_colorExp + ")", "gi");
  ColorPropsPlugin.colorStringFilter = _colorStringFilter = function(a) {
    var combined = a[0] + a[1],
        toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
      a[0] = _formatColors(a[0], toHSL);
      a[1] = _formatColors(a[1], toHSL);
    }
  };
  if (!TweenLite.defaultStringFilter) {
    TweenLite.defaultStringFilter = ColorPropsPlugin.colorStringFilter;
  }
  ColorPropsPlugin.parseColor = _parseColor;
  p = ColorPropsPlugin.prototype;
  p._firstNumPT = null;
  p._kill = function(lookup) {
    var pt = this._firstNumPT,
        prev;
    while (pt) {
      if (pt.p in lookup) {
        if (pt === p._firstNumPT) {
          this._firstNumPT = pt._next;
        }
        if (prev) {
          prev._next = pt._next;
        }
      } else {
        prev = pt;
      }
      pt = pt._next;
    }
    return this._super._kill(lookup);
  };
});
if (_gsScope._gsDefine) {
  _gsScope._gsQueue.pop()();
}
(function(name) {
  "use strict";
  var getGlobal = function() {
    return (_gsScope.GreenSockGlobals || _gsScope)[name];
  };
  if (typeof(define) === "function" && define.amd) {
    define(["TweenLite"], getGlobal);
  } else if (typeof(module) !== "undefined" && module.exports) {
    require('../TweenLite');
    module.exports = getGlobal();
  }
}("ColorPropsPlugin"));
