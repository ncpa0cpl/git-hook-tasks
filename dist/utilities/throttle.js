"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
function throttle(func, wait, options) {
    if (options === void 0) { options = {}; }
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options)
        options = {};
    var later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        // @ts-expect-error
        if (!timeout)
            context = args = null;
    };
    var fn = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        var now = Date.now();
        if (!previous && options.leading === false)
            previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = a;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            // @ts-expect-error
            if (!timeout)
                context = args = null;
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
    fn.setWait = function (ms) {
        wait = ms;
    };
    return fn;
}
exports.throttle = throttle;
