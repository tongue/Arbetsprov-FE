import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import styles from "rollup-plugin-styles";
import svgr from "@svgr/rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import rename from "rollup-plugin-rename";
import cleaner from "rollup-plugin-cleaner";

const cfg = {
  input: ["./src/index.ts", "./src/theme/index.ts"],
  output: [
    {
      dir: "build",
      format: "es",
      sourcemap: true,
      exports: "auto",
      assetFileNames: "[name][extname]",
    },
  ],
  preserveModules: true,
  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    styles(),
    url(),
    svgr(),
    typescript(),
    rename({
      include: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.css", "**/*.svg"],
      map: (name) =>
        name
          .replace("packages/kit/src/", "")
          .replace("../../../../node_modules/", "../node_modules/"),
    }),
    cleaner({
      targets: ["./build/"],
    }),
  ],
};

export default cfg;
