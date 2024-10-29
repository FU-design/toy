var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var curry = function (fn) {
  return function curried() {
    var _this = this;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (fn.length <= args.length) {
      return fn.apply(this, args);
    }
    return function () {
      var args2 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args2[_i] = arguments[_i];
      }
      return curried.apply(_this, __spreadArray(__spreadArray([], args, true), [args2], false));
    };
  };
};
var join = function (a, b, c) {
  return ''.concat(a, '_').concat(b, '_').concat(c);
};
var curriedJoin = curry(join);
setTimeout(console.log, 0, curriedJoin(1, 2, 3));
setTimeout(console.log, 0, curriedJoin(1));
setTimeout(console.log, 0, curriedJoin(1, 2));
