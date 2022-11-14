"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostponedOperationError = exports.OperationError = void 0;
var chalk_1 = __importDefault(require("chalk"));
var output_manager_1 = require("./output/output-manager");
var OperationError = /** @class */ (function (_super) {
    __extends(OperationError, _super);
    function OperationError(data, noPrint) {
        if (noPrint === void 0) { noPrint = false; }
        var _this = _super.call(this, "Operation Error") || this;
        _this._isOperationError = true;
        if (!noPrint) {
            output_manager_1.OutputManager.staticLine(["\n"]);
            output_manager_1.OutputManager.staticLine([data]);
            output_manager_1.OutputManager.staticLine(["\n"]);
            output_manager_1.OutputManager.staticLine([
                chalk_1.default.redBright("Git hook task has failed. Exiting."),
            ]);
        }
        return _this;
    }
    OperationError.isOperationError = function (e) {
        if ("_isOperationError" in e) {
            return e._isOperationError === true;
        }
        return false;
    };
    return OperationError;
}(Error));
exports.OperationError = OperationError;
var PostponedOperationError = /** @class */ (function (_super) {
    __extends(PostponedOperationError, _super);
    function PostponedOperationError(errorData) {
        var _this = _super.call(this, "Operation Error") || this;
        _this._isPostponedOperationError = true;
        _this.errorData = errorData;
        return _this;
    }
    PostponedOperationError.isPostponedOperationError = function (e) {
        if ("_isPostponedOperationError" in e) {
            return e._isPostponedOperationError === true;
        }
        return false;
    };
    PostponedOperationError.print = function (por) {
        output_manager_1.OutputManager.staticLine(["\n"]);
        output_manager_1.OutputManager.staticLine([por.errorData]);
        output_manager_1.OutputManager.staticLine(["\n"]);
    };
    return PostponedOperationError;
}(Error));
exports.PostponedOperationError = PostponedOperationError;
