"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = void 0;
const dilswer_1 = require("dilswer");
const HookTaskTypeDef = dilswer_1.DataType.OneOf(dilswer_1.DataType.String, dilswer_1.DataType.ArrayOf(dilswer_1.DataType.RecordOf({
    name: dilswer_1.DataType.String,
    script: dilswer_1.DataType.String,
}), dilswer_1.DataType.RecordOf({
    name: dilswer_1.DataType.String,
    taskFile: dilswer_1.DataType.String,
})));
const ConfigTypeDef = dilswer_1.DataType.RecordOf({
    packageManager: dilswer_1.DataType.OneOf(dilswer_1.DataType.Literal("yarn"), dilswer_1.DataType.Literal("npm")),
    hooks: {
        required: false,
        type: dilswer_1.DataType.RecordOf({
            "pre-push": { required: false, type: HookTaskTypeDef },
            "pre-commit": { required: false, type: HookTaskTypeDef },
            "post-commit": { required: false, type: HookTaskTypeDef },
        }),
    },
});
exports.validateConfig = (0, dilswer_1.createValidatedFunction)(ConfigTypeDef, (data) => data, (err) => {
    throw new Error(`Config file incorrect. Option '${err.fieldPath}' is not of the expected type.`);
});
