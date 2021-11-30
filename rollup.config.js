import commonjs from "rollup-plugin-commonjs";
import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const dev = {
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
  plugins: [commonjs(), del({ targets: "dist/*" })],
};

const prod = {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.prod.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.prod.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [terser(), commonjs()],
};

export default [dev, prod];
