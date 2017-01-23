/* */ 
"format cjs";
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";
  _gsScope._gsDefine.plugin({
    propName: "directionalRotation",
    version: "0.3.0",
    API: 2,
    init: function(target, value, tween, index) {
      if (typeof(value) !== "object") {
        value = {rotation: value};
      }
      this.finals = {};
      var cap = (value.useRadians === true) ? Math.PI * 2 : 360,
          min = 0.000001,
          p,
          v,
          start,
          end,
          dif,
          split;
      for (p in value) {
        if (p !== "useRadians") {
          end = value[p];
          if (typeof(end) === "function") {
            end = end(index, target);
          }
          split = (end + "").split("_");
          v = split[0];
          start = parseFloat((typeof(target[p]) !== "function") ? target[p] : target[((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3))]());
          end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
          dif = end - start;
          if (split.length) {
            v = split.join("_");
            if (v.indexOf("short") !== -1) {
              dif = dif % cap;
              if (dif !== dif % (cap / 2)) {
                dif = (dif < 0) ? dif + cap : dif - cap;
              }
            }
            if (v.indexOf("_cw") !== -1 && dif < 0) {
              dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
            } else if (v.indexOf("ccw") !== -1 && dif > 0) {
              dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
            }
          }
          if (dif > min || dif < -min) {
            this._addTween(target, p, start, start + dif, p);
            this._overwriteProps.push(p);
          }
        }
      }
      return true;
    },
    set: function(ratio) {
      var pt;
      if (ratio !== 1) {
        this._super.setRatio.call(this, ratio);
      } else {
        pt = this._firstPT;
        while (pt) {
          if (pt.f) {
            pt.t[pt.p](this.finals[pt.p]);
          } else {
            pt.t[pt.p] = this.finals[pt.p];
          }
          pt = pt._next;
        }
      }
    }
  })._autoCSS = true;
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
}("DirectionalRotationPlugin"));
