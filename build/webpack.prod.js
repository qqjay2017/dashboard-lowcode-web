const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");
const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";
const isProduct = NODE_ENV === "production";
const publicPath = isProduct ? "/dashboard/" : "/";
 const CDN_LIST = isProduct?[
  "unpkg/react.production.min.js",
  "unpkg/react-dom.production.min.js",
  "unpkg/handlebars.js",
  "unpkg/html2canvas.min.js",
  "unpkg/echarts.min.js"
].map(url=>publicPath+url):[]
const resolve = (name) => {
  return path.join(__dirname, name);
};


const _target = "https://uat.kxgcc.com";
module.exports = {
  mode: NODE_ENV,
  devtool: isProduct ? false : "inline-source-map",

  entry: {
    main: resolve("../src/main.tsx"),
    report: resolve("../report/report-main.tsx"),
  },
  output: {
    clean: true,
    filename: isProduct ?  "[name].[contenthash].js":"[name].js",
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
              !isProduct  && require.resolve('react-refresh/babel')
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

          cacheGroups: {
            libs: {
              minChunks: 3,
              name: "chunk-libs",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial", // only package third parties that are initially dependent
            },
            lodash: {
              test: /[\\/]node_modules[\\/](lodash-es)[\\/]/,
              name: "lodash-es",
              chunks: "all",
              reuseExistingChunk: true,
              enforce: true,
            },

            antd: {
              test: /[\\/]node_modules[\\/]_?antd(.*)/,
              priority: 20,
              name: "chunk-antd",
            },
            formily: {
              test: /[\\/]node_modules[\\/]_?@formily(.*)/,
              name: "chunk-formily",
              chunks: "all",
            },

            moveable: {
              test: /[\\/]node_modules[\\/]_?react-moveable(.*)/,
              priority: 20,
              name: "chunk-reactmoveable",
            },
            // commons: {
            //   name: "chunk-commons",
            //   test: resolve("../src/schema-component"), // can customize your rules
            //   minChunks: 3, //  minimum common number
            //   priority: 5,
            //   reuseExistingChunk: true,
            // },
          },
        },
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
          }),
        ],
      }
    : {},
  externals: isProduct
    ? {
      handlebars:"Handlebars",
        react: "React",
        "react-dom": "ReactDOM",
        html2canvas: "html2canvas",
        echarts: "echarts",
      }
    : {},
  plugins: [
    // new MonacoWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "/build/index.html",
      filename: "index.html",
      chunks: ["main"],
        CDN_LIST
    }),
    new HtmlWebpackPlugin({
      template: "/report/index.html",
      filename: "report/index.html",
      //   filename: "/report/index.html",
      chunks: ["report"],
      CDN_LIST
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
      filename: isProduct ?  "[name].[contenthash].css":"[name].css",
    }),
    !isProduct && new ReactRefreshWebpackPlugin()
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
        target: "http://localhost:3001",
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/dashboard-api/, ""),
      },
    ],
  },
  cache: {
    type: "filesystem",
  },
};
