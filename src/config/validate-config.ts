import type { GetDataType } from "dilswer";
import { createValidatedFunction, DataType } from "dilswer";

const HookTaskTypeDef = DataType.OneOf(
  DataType.String,
  DataType.ArrayOf(
    DataType.RecordOf({
      name: DataType.String,
      script: DataType.String,
    }),
    DataType.RecordOf({
      name: DataType.String,
      taskFile: DataType.String,
    })
  )
);

const ConfigTypeDef = DataType.RecordOf({
  packageManager: DataType.OneOf(
    DataType.Literal("yarn"),
    DataType.Literal("npm")
  ),
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
