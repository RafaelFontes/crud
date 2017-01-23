/* */ 
"format cjs";
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";
  _gsScope._gsDefine.plugin({
    propName: "attr",
    API: 2,
    version: "0.6.0",
    init: function(target, value, tween, index) {
      var p,
          end;
      if (typeof(target.setAttribute) !== "function") {
        return false;
      }
      for (p in value) {
        end = value[p];
        if (typeof(end) === "function") {
          end = end(index, target);
        }
        this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);
        this._overwriteProps.push(p);
      }
      return true;
    }
  });
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
}("AttrPlugin"));
