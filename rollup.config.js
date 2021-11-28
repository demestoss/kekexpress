import commonjs from "rollup-plugin-commonjs";
import del from "rollup-plugin-delete";

import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      commonjs(),
      del({ targets: "dist/*" }),
    ],
  }
];