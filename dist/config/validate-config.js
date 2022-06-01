"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = void 0;
var dilswer_1 = require("dilswer");
var HookTaskTypeDef = dilswer_1.DataType.OneOf(dilswer_1.DataType.String, dilswer_1.DataType.ArrayOf(dilswer_1.DataType.RecordOf({
    name: dilswer_1.DataType.String,
    script: dilswer_1.DataType.String,
    mustRunAlone: { type: dilswer_1.DataType.Boolean, required: false },
}), dilswer_1.DataType.RecordOf({
    name: dilswer_1.DataType.String,
    taskFile: dilswer_1.DataType.String,
    mustRunAlone: { type: dilswer_1.DataType.Boolean, required: false },
})));
var ConfigTypeDef = dilswer_1.DataType.RecordOf({
    packageManager: dilswer_1.DataType.OneOf(dilswer_1.DataType.Literal("yarn"), dilswer_1.DataType.Literal("npm")),
    parallel: {
        required: false,
        type: dilswer_1.DataType.OneOf(dilswer_1.DataType.Boolean, dilswer_1.DataType.RecordOf({
            "pre-push": { required: false, type: dilswer_1.DataType.Boolean },
            "pre-commit": { required: false, type: dilswer_1.DataType.Boolean },
            "post-commit": { required: false, type: dilswer_1.DataType.Boolean },
        })),
    },
    parallelPoolSize: { required: false, type: dilswer_1.DataType.Number },
    hooks: {
        required: false,
        type: dilswer_1.DataType.RecordOf({
            "pre-push": { required: false, type: HookTaskTypeDef },
            "pre-commit": { required: false, type: HookTaskTypeDef },
            "post-commit": { required: false, type: HookTaskTypeDef },
        }),
    },
});
exports.validateConfig = (0, dilswer_1.createValidatedFunction)(ConfigTypeDef, function (data) { return data; }, function (err) {
    throw new Error("Config file incorrect. Option '".concat(err.fieldPath, "' is not of the expected type."));
});
