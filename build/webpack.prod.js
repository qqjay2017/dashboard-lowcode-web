const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const WebpackBar = require("webpackbar");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const { WebpackPluginServe } = require("webpack-plugin-serve");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");

const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";
const isProduct = NODE_ENV === "production";
const publicPath = isProduct ? "/dashboard/" : "/";
const CDN_LIST = !isProduct
  ? []
  : [
      isProduct
        ? "unpkg/react.production.min.js"
        : "unpkg/react.development.js",
      isProduct
        ? "unpkg/react-dom.production.min.js"
        : "unpkg/react-dom.development.js",
      "unpkg/handlebars.js",
      "unpkg/html2canvas.min.js",
      "unpkg/echarts.min.js",
    ].map((url) => publicPath + url);
function resolve(name) {
  return path.join(__dirname, name);
}

const _target = "http://qzjg.kxgcc.com:30251";
module.exports = {
  mode: NODE_ENV,
  devtool: isProduct ? false : "inline-source-map",

  entry: {
    main: resolve("../src/main.tsx"),
    report: resolve("../report/report-main.tsx"),
  },
  output: {
    clean: true,
    filename: isProduct ? "[name].[contenthash].js" : "[name].js",
    path: resolve("../dist"),
    publicPath,
  },
  resolve: {
    alias: {
      "@": resolve("../src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    fallback: {
      net: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              [
                "@emotion",
                {
                  sourceMap: !isProduct,
                  autoLabel: "dev-only",
                  labelFormat: "[local]",
                  cssPropOptimization: true,
                },
              ],
            ].filter(Boolean),
          },
        },
      },

      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          isProduct ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          isProduct ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          isProduct ? MiniCssExtractPlugin.loader : "style-loader",

          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          isProduct ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
    ],
  },
  optimization: isProduct
    ? {
        splitChunks: {
          chunks: "all",
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: ".",
          cacheGroups: {
            vendor: {
              name: "vendors",
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
        minimize: isProduct,
        minimizer: isProduct
          ? [
              new TerserPlugin({
                parallel: true,
              }),
            ]
          : [],
      }
    : {},
  externals: isProduct
    ? {
        handlebars: "Handlebars",
        react: "React",
        "react-dom": "ReactDOM",
        html2canvas: "html2canvas",
        echarts: "echarts",
      }
    : {},
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("index.html"),
      filename: "index.html",
      chunks: ["main"],
      CDN_LIST,
    }),
    new HtmlWebpackPlugin({
      template: resolve("../report/index.html"),
      filename: "report/index.html",
      //   filename: "/report/index.html",
      chunks: ["report"],
      CDN_LIST,
      //   publicPath: "/report/",
    }),

    isProduct
      ? new CopyPlugin({
          patterns: [{ from: "public", to: "" }],
        })
      : undefined,
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BASE_URL": JSON.stringify(publicPath),
    }),
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduct ? "[name].[contenthash].css" : "[name].css",
    }),

    new WebpackBar({}),
  ].filter(Boolean),
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/index.html" },
        { from: /^\/report/, to: "/report/index.html" },
      ],
    },
    port: 9522,
    open: false,
    hot: true,
    proxy: [
      {
        context: [
          "/api/",
          "/public/",
          "/openapi/",
          "/auth/",
          "/cms-static/",
          "/component-shared-center/",
        ],
        target: _target,
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
      {
        context: ["/dashboard-api/"],
        target: "http://192.168.0.102:3001",
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/dashboard-api/, ""),
      },
    ],
  },
  cache: {
    type: "filesystem",
  },
};
