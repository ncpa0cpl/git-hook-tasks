import { Argument } from "clify.js";

export const PM = Argument.define({
  flagChar: "-p",
  keyword: "--package-manager",
  dataType: "string",
  require: true,
});
