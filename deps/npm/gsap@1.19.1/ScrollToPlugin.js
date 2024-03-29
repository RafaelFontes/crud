/* */ 
"format cjs";
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";
  var _doc = document.documentElement,
      _window = _gsScope,
      _max = function(element, axis) {
        var dim = (axis === "x") ? "Width" : "Height",
            scroll = "scroll" + dim,
            client = "client" + dim,
            body = document.body;
        return (element === _window || element === _doc || element === body) ? Math.max(_doc[scroll], body[scroll]) - (_window["inner" + dim] || _doc[client] || body[client]) : element[scroll] - element["offset" + dim];
      },
      _unwrapElement = function(value) {
        if (typeof(value) === "string") {
          value = TweenLite.selector(value);
        }
        if (value.length && value !== _window && value[0] && value[0].style && !value.nodeType) {
          value = value[0];
        }
        return (value === _window || (value.nodeType && value.style)) ? value : null;
      },
      _buildGetter = function(e, axis) {
        var p = "scroll" + ((axis === "x") ? "Left" : "Top");
        if (e === _window) {
          if (e.pageXOffset != null) {
            p = "page" + axis.toUpperCase() + "Offset";
          } else if (_doc[p] != null) {
            e = _doc;
          } else {
            e = document.body;
          }
        }
        return function() {
          return e[p];
        };
      },
      _getOffset = function(element, container) {
        var rect = _unwrapElement(element).getBoundingClientRect(),
            isRoot = (!container || container === _window || container === document.body),
            cRect = (isRoot ? _doc : container).getBoundingClientRect(),
            offsets = {
              x: rect.left - cRect.left,
              y: rect.top - cRect.top
            };
        if (!isRoot && container) {
          offsets.x += _buildGetter(container, "x")();
          offsets.y += _buildGetter(container, "y")();
        }
        return offsets;
      },
      _parseVal = function(value, target, axis) {
        var type = typeof(value);
        if (type === "number" || (type === "string" && value.charAt(1) === "=")) {
          return value;
        } else if (value === "max") {
          return _max(target, axis);
        }
        return Math.min(_max(target, axis), _getOffset(value, target)[axis]);
      },
      ScrollToPlugin = _gsScope._gsDefine.plugin({
        propName: "scrollTo",
        API: 2,
        global: true,
        version: "1.8.1",
        init: function(target, value, tween) {
          this._wdw = (target === _window);
          this._target = target;
          this._tween = tween;
          if (typeof(value) !== "object") {
            value = {y: value};
            if (typeof(value.y) === "string" && value.y !== "max" && value.y.charAt(1) !== "=") {
              value.x = value.y;
            }
          } else if (value.nodeType) {
            value = {
              y: value,
              x: value
            };
          }
          this.vars = value;
          this._autoKill = (value.autoKill !== false);
          this.getX = _buildGetter(target, "x");
          this.getY = _buildGetter(target, "y");
          this.x = this.xPrev = this.getX();
          this.y = this.yPrev = this.getY();
          if (value.x != null) {
            this._addTween(this, "x", this.x, _parseVal(value.x, target, "x") - (value.offsetX || 0), "scrollTo_x", true);
            this._overwriteProps.push("scrollTo_x");
          } else {
            this.skipX = true;
          }
          if (value.y != null) {
            this._addTween(this, "y", this.y, _parseVal(value.y, target, "y") - (value.offsetY || 0), "scrollTo_y", true);
            this._overwriteProps.push("scrollTo_y");
          } else {
            this.skipY = true;
          }
          return true;
        },
        set: function(v) {
          this._super.setRatio.call(this, v);
          var x = (this._wdw || !this.skipX) ? this.getX() : this.xPrev,
              y = (this._wdw || !this.skipY) ? this.getY() : this.yPrev,
              yDif = y - this.yPrev,
              xDif = x - this.xPrev,
              threshold = ScrollToPlugin.autoKillThreshold;
          if (this.x < 0) {
            this.x = 0;
          }
          if (this.y < 0) {
            this.y = 0;
          }
          if (this._autoKill) {
            if (!this.skipX && (xDif > threshold || xDif < -threshold) && x < _max(this._target, "x")) {
              this.skipX = true;
            }
            if (!this.skipY && (yDif > threshold || yDif < -threshold) && y < _max(this._target, "y")) {
              this.skipY = true;
            }
            if (this.skipX && this.skipY) {
              this._tween.kill();
              if (this.vars.onAutoKill) {
                this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []);
              }
            }
          }
          if (this._wdw) {
            _window.scrollTo((!this.skipX) ? this.x : x, (!this.skipY) ? this.y : y);
          } else {
            if (!this.skipY) {
              this._target.scrollTop = this.y;
            }
            if (!this.skipX) {
              this._target.scrollLeft = this.x;
            }
          }
          this.xPrev = this.x;
          this.yPrev = this.y;
        }
      }),
      p = ScrollToPlugin.prototype;
  ScrollToPlugin.max = _max;
  ScrollToPlugin.getOffset = _getOffset;
  ScrollToPlugin.autoKillThreshold = 7;
  p._kill = function(lookup) {
    if (lookup.scrollTo_x) {
      this.skipX = true;
    }
    if (lookup.scrollTo_y) {
      this.skipY = true;
    }
    return this._super._kill.call(this, lookup);
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
    define(["./TweenLite"], getGlobal);
  } else if (typeof(module) !== "undefined" && module.exports) {
    require('./TweenLite');
    module.exports = getGlobal();
  }
}("ScrollToPlugin"));
