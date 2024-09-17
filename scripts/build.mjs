import { build } from "@ncpa0cpl/nodepack";
import path from "path";
import { URL } from "url";

const root = path.dirname(new URL(import.meta.url).pathname);

const __DEV__ = process.argv.includes("--dev");
const NO_MAP = process.argv.includes("--no-map");

const p = (v) => path.resolve(root, "..", v);

async function main() {
  await build({
    srcDir: p("src"),
    outDir: p("dist"),
    entrypoint: p("src/bin/bin.ts"),
    tsConfig: p("tsconfig.json"),
    bundle: true,
    target: "es2022",
    formats: ["legacy", "esm"],
    preset: { node: true },
    esbuildOptions: {
      minify: !__DEV__,
      sourcemap: NO_MAP ? false : __DEV__ ? "inline" : false,
      keepNames: true,
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
