"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleInterceptor = void 0;
var ConsoleInterceptor = /** @class */ (function () {
    function ConsoleInterceptor() {
        this.buffer = [];
    }
    ConsoleInterceptor.restore = function () {
        console.clear = this.originals.clear;
        console.debug = this.originals.debug;
        console.error = this.originals.error;
        console.info = this.originals.info;
        console.log = this.originals.log;
        console.table = this.originals.table;
        console.warn = this.originals.warn;
    };
    ConsoleInterceptor.intercept = function () {
        var interceptor = new ConsoleInterceptor();
        console.clear = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return interceptor.intercept("clear", args);
        };
        console.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return interceptor.intercept("debug", args);
        };
        console.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return interceptor.intercept("error", args);
        };
        console.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return interceptor.intercept("info", args);
        };
        console.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return interceptor.intercept("log", args);
        };
        console.table = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return interceptor.intercept("table", args);
        };
        console.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return interceptor.intercept("warn", args);
        };
        return interceptor;
    };
    ConsoleInterceptor.prototype.intercept = function (loglevel, args) {
        this.buffer.push([loglevel, args]);
    };
    ConsoleInterceptor.prototype.read = function () {
        return __spreadArray([], __read(this.buffer), false);
    };
    ConsoleInterceptor.originals = {
        log: console.log,
        error: console.error,
        info: console.info,
        warn: console.warn,
        debug: console.debug,
        clear: console.clear,
        table: console.table,
    };
    return ConsoleInterceptor;
}());
exports.ConsoleInterceptor = ConsoleInterceptor;
