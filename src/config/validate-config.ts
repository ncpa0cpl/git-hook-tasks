import type { GetDataType } from "dilswer";
import { createValidatedFunction, Type } from "dilswer";

const HookTaskTypeDef = Type.OneOf(
  Type.String,
  Type.ArrayOf(
    Type.RecordOf({
      name: Type.String,
      script: Type.String,
      mustRunAlone: { type: Type.Boolean, required: false },
    }),
    Type.RecordOf({
      name: Type.String,
      taskFile: Type.String,
      mustRunAlone: { type: Type.Boolean, required: false },
    })
  )
);

const ConfigTypeDef = Type.RecordOf({
  packageManager: Type.OneOf(Type.Literal("yarn"), Type.Literal("npm")),
  parallel: {
    required: false,
    type: Type.OneOf(
      Type.Boolean,
      Type.RecordOf({
        "pre-push": { required: false, type: Type.Boolean },
        "pre-commit": { required: false, type: Type.Boolean },
        "post-commit": { required: false, type: Type.Boolean },
      })
    ),
  },
  parallelPoolSize: { required: false, type: Type.Number },
  hooks: {
    required: false,
    type: Type.RecordOf({
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
