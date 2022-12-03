const WebpackShellPluginNext = require("webpack-shell-plugin-next");
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [],
    },
  },

  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: { extract: false },
  filenameHashing: false,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
  configureWebpack: {
    plugins: [
      new WebpackShellPluginNext({
        onBuildEnd: {
          scripts: ["node finalize.js"],
          blocking: false,
          parallel: true,
        },
      }),
    ],
  },
};
