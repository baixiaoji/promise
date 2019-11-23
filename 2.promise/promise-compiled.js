"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Promise2 =
/*#__PURE__*/
function () {
  function Promise2(fn) {
    _classCallCheck(this, Promise2);

    this.callbacks = [];
    this.state = 'pending';

    if (typeof fn !== 'function') {
      return new Error('必须是一个函数');
    }

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  _createClass(Promise2, [{
    key: "resolve",
    value: function resolve(result) {
      var _this = this;

      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      nextTick(function () {
        _this.callbacks.forEach(function (handler) {
          var x;

          try {
            x = handler[0].call(undefined, result);
          } catch (e) {
            return _this.reject(e);
          }

          handler[2].resolveWith(x);
        });
      });
    }
  }, {
    key: "reject",
    value: function reject(reason) {
      var _this2 = this;

      if (this.state === 'rejected') {}

      if (this.state !== 'pending') return;
      this.state = 'rejected';
      nextTick(function () {
        _this2.callbacks.forEach(function (handler) {
          var x = '';

          try {
            x = handler[1].call(undefined, reason);
          } catch (e) {
            return _this2.reject(e);
          }

          handler[2].resolveWith(x);
        });
      });
    }
  }, {
    key: "then",
    value: function then(success, fail) {
      var handlerCollect = [];
      handlerCollect[0] = typeof success === 'function' ? success : function (value) {
        return value;
      };
      handlerCollect[1] = typeof fail === 'function' ? fail : function (error) {
        throw error;
      };
      handlerCollect[2] = new Promise2(function () {});
      this.callbacks.push(handlerCollect);
      return handlerCollect[2];
    }
  }, {
    key: "resolveWith",
    value: function resolveWith(x) {
      if (this === x) {
        this.resolveWithItself();
      } else if (x instanceof Promise2) {
        this.resolveWithPromise(x);
      } else if (x instanceof Object) {
        this.resolveWithObject(x);
      } else {
        this.resolve(x);
      }
    }
  }, {
    key: "resolveWithObject",
    value: function resolveWithObject(x) {
      var then;

      try {
        then = x.then;
      } catch (e) {
        this.reject(e);
      }

      if (typeof then === 'function') {
        this.resolveWithThenable(x);
      } else {
        this.resolve(x);
      }
    }
  }, {
    key: "resolveWithPromise",
    value: function resolveWithPromise(x) {
      var _this3 = this;

      x.then(function (result) {
        _this3.resolve(result);
      }, function (reason) {
        _this3.reject(reason);
      });
    }
  }, {
    key: "resolveWithItself",
    value: function resolveWithItself() {
      this.reject(new TypeError('不能循环调用'));
    }
  }, {
    key: "resolveWithThenable",
    value: function resolveWithThenable(x) {
      var _this4 = this;

      try {
        x.then(function (y) {
          _this4.resolveWith(y);
        }, function (r) {
          _this4.reject(r);
        });
      } catch (e) {
        this.reject(e);
      }
    }
  }], [{
    key: "resolve",
    value: function resolve(result) {
      return new Promise2(function (resolve) {
        resolve(result);
      });
    }
  }, {
    key: "reject",
    value: function reject(reason) {
      return new Promise2(function (resolve, reject) {
        reject(reason);
      });
    }
  }]);

  return Promise2;
}();

var _default = Promise2;
exports["default"] = _default;

function nextTick(fn) {
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn);
  } else {
    var counter = 1;
    var observer = new MutationObserver(fn);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    counter = counter + 1;
    textNode.data = String(counter);
  }
}
