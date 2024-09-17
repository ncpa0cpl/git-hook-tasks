import { defineOption } from "clify.js";

export const PM = defineOption({
  char: "p",
  name: "package-manager",
  type: "string",
  required: true,
});
