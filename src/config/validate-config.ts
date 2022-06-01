import type { GetDataType } from "dilswer";
import { createValidatedFunction, DataType } from "dilswer";

const HookTaskTypeDef = DataType.OneOf(
  DataType.String,
  DataType.ArrayOf(
    DataType.RecordOf({
      name: DataType.String,
      script: DataType.String,
      mustRunAlone: { type: DataType.Boolean, required: false },
    }),
    DataType.RecordOf({
      name: DataType.String,
      taskFile: DataType.String,
      mustRunAlone: { type: DataType.Boolean, required: false },
    })
  )
);

const ConfigTypeDef = DataType.RecordOf({
  packageManager: DataType.OneOf(
    DataType.Literal("yarn"),
    DataType.Literal("npm")
  ),
  parallel: {
    required: false,
    type: DataType.OneOf(
      DataType.Boolean,
      DataType.RecordOf({
        "pre-push": { required: false, type: DataType.Boolean },
        "pre-commit": { required: false, type: DataType.Boolean },
        "post-commit": { required: false, type: DataType.Boolean },
      })
    ),
  },
  parallelPoolSize: { required: false, type: DataType.Number },
  hooks: {
    required: false,
    type: DataType.RecordOf({
      "pre-push": { required: false, type: HookTaskTypeDef },
      "pre-commit": { required: false, type: HookTaskTypeDef },
      "post-commit": { required: false, type: HookTaskTypeDef },
    }),
  },
});

export type GitHookTasksConfig = GetDataType<typeof ConfigTypeDef>;

export const validateConfig = createValidatedFunction(
  ConfigTypeDef,
  (data) => data,
  (err) => {
    throw new Error(
      `Config file incorrect. Option '${err.fieldPath}' is not of the expected type.`
    );
  }
);
