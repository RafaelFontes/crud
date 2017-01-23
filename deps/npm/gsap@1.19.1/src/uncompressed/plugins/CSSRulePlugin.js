/* */ 
"format cjs";
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";
  _gsScope._gsDefine("plugins.CSSRulePlugin", ["plugins.TweenPlugin", "TweenLite", "plugins.CSSPlugin"], function(TweenPlugin, TweenLite, CSSPlugin) {
    var CSSRulePlugin = function() {
      TweenPlugin.call(this, "cssRule");
      this._overwriteProps.length = 0;
    },
        _doc = _gsScope.document,
        _superSetRatio = CSSPlugin.prototype.setRatio,
        p = CSSRulePlugin.prototype = new CSSPlugin();
    p._propName = "cssRule";
    p.constructor = CSSRulePlugin;
    CSSRulePlugin.version = "0.6.4";
    CSSRulePlugin.API = 2;
    CSSRulePlugin.getRule = function(selector) {
      var ruleProp = _doc.all ? 'rules' : 'cssRules',
          ss = _doc.styleSheets,
          i = ss.length,
          pseudo = (selector.charAt(0) === ":"),
          j,
          curSS,
          cs,
          a;
      selector = (pseudo ? "" : ",") + selector.toLowerCase() + ",";
      if (pseudo) {
        a = [];
      }
      while (--i > -1) {
        try {
          curSS = ss[i][ruleProp];
          if (!curSS) {
            continue;
          }
          j = curSS.length;
        } catch (e) {
          console.log(e);
          continue;
        }
        while (--j > -1) {
          cs = curSS[j];
          if (cs.selectorText && ("," + cs.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(selector) !== -1) {
            if (pseudo) {
              a.push(cs.style);
            } else {
              return cs.style;
            }
          }
        }
      }
      return a;
    };
    p._onInitTween = function(target, value, tween) {
      if (target.cssText === undefined) {
        return false;
      }
      var div = target._gsProxy = target._gsProxy || _doc.createElement("div");
      this._ss = target;
      this._proxy = div.style;
      div.style.cssText = target.cssText;
      CSSPlugin.prototype._onInitTween.call(this, div, value, tween);
      return true;
    };
    p.setRatio = function(v) {
      _superSetRatio.call(this, v);
      this._ss.cssText = this._proxy.cssText;
    };
    TweenPlugin.activate([CSSRulePlugin]);
    return CSSRulePlugin;
  }, true);
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
}("CSSRulePlugin"));
