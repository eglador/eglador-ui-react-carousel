import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  tsconfig: "tsconfig.build.json",
  clean: true,
  sourcemap: false,
  minify: true,
  external: ["react", "react-dom", /^embla-carousel/],
  noExternal: ["clsx", "tailwind-merge"],
  banner: {
    js: '"use client";',
  },
});
