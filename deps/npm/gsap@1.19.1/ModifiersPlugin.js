/* */ 
"format cjs";
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";
  var _cssRatioSetter = function(pt, cssp, mod) {
    var type = pt.type,
        oldSetRatio = pt.setRatio,
        tween = cssp._tween,
        target = cssp._target;
    pt.type = 2;
    pt.m = mod;
    pt.setRatio = function(v) {
      var min = 0.000001,
          val,
          str,
          i;
      if (v === 1 && (tween._time === tween._duration || tween._time === 0)) {
        if (type !== 2) {
          if (pt.r && type !== -1) {
            val = Math.round(pt.s + pt.c);
            if (!type) {
              pt.t[pt.p] = mod(val + pt.xs0, target);
            } else if (type === 1) {
              str = pt.xs0 + val + pt.xs1;
              for (i = 1; i < pt.l; i++) {
                str += pt["xn" + i] + pt["xs" + (i + 1)];
              }
              pt.t[pt.p] = mod(str, target);
            }
          } else {
            pt.t[pt.p] = mod(pt.e, target);
          }
        } else {
          oldSetRatio.call(pt, v);
        }
      } else if (v || !(tween._time === tween._duration || tween._time === 0) || tween._rawPrevTime === -0.000001) {
        val = pt.c * v + pt.s;
        if (pt.r) {
          val = Math.round(val);
        } else if (val < min)
          if (val > -min) {
            val = 0;
          }
        if (!type) {
          pt.t[pt.p] = mod(val + pt.xs0, target);
        } else if (type === 1) {
          str = pt.xs0 + val + pt.xs1;
          for (i = 1; i < pt.l; i++) {
            str += pt["xn" + i] + pt["xs" + (i + 1)];
          }
          pt.t[pt.p] = mod(str, target);
        } else if (type === -1) {
          pt.t[pt.p] = mod(pt.xs0, target);
        } else if (oldSetRatio) {
          oldSetRatio.call(pt, v);
        }
      } else {
        if (type !== 2) {
          pt.t[pt.p] = mod(pt.b, target);
        } else {
          oldSetRatio.call(pt, v);
        }
      }
    };
  },
      _modCSS = function(lookup, cssp) {
        var pt = cssp._firstPT,
            hasBezier = (lookup.rotation && cssp._overwriteProps.join("").indexOf("bezier") !== -1);
        while (pt) {
          if (typeof(lookup[pt.p]) === "function") {
            _cssRatioSetter(pt, cssp, lookup[pt.p]);
          } else if (hasBezier && pt.n === "bezier" && pt.plugin._overwriteProps.join("").indexOf("rotation") !== -1) {
            pt.data.mod = lookup.rotation;
          }
          pt = pt._next;
        }
      },
      ModifiersPlugin = _gsScope._gsDefine.plugin({
        propName: "modifiers",
        version: "0.0.2",
        API: 2,
        init: function(target, value, tween) {
          this._tween = tween;
          this._vars = value;
          return true;
        },
        initAll: function() {
          var tween = this._tween,
              lookup = this._vars,
              mpt = this,
              pt = tween._firstPT,
              val,
              next;
          while (pt) {
            next = pt._next;
            val = lookup[pt.n];
            if (pt.pg) {
              if (pt.t._propName === "css") {
                _modCSS(lookup, pt.t);
              } else if (pt.t !== mpt) {
                val = lookup[pt.t._propName];
                pt.t._mod((typeof(val) === "object") ? val : lookup);
              }
            } else if (typeof(val) === "function") {
              if (pt.f === 2 && pt.t) {
                pt.t._applyPT.m = val;
              } else {
                this._add(pt.t, pt.p, pt.s, pt.c, val);
                if (next) {
                  next._prev = pt._prev;
                }
                if (pt._prev) {
                  pt._prev._next = next;
                } else if (tween._firstPT === pt) {
                  tween._firstPT = next;
                }
                pt._next = pt._prev = null;
                tween._propLookup[pt.n] = mpt;
              }
            }
            pt = next;
          }
          return false;
        }
      }),
      p = ModifiersPlugin.prototype;
  p._add = function(target, p, s, c, mod) {
    this._addTween(target, p, s, s + c, p, mod);
    this._overwriteProps.push(p);
  };
  p = _gsScope._gsDefine.globals.TweenLite.version.split(".");
  if (Number(p[0]) <= 1 && Number(p[1]) < 19 && _gsScope.console) {
    console.log("ModifiersPlugin requires GSAP 1.19.0 or later.");
  }
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
    define(["./TweenLite"], getGlobal);
  } else if (typeof(module) !== "undefined" && module.exports) {
    require('./TweenLite');
    module.exports = getGlobal();
  }
}("ModifiersPlugin"));
