const path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const PROXY_API = process.env.VUE_APP_PROXY_API
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: IS_PROD ? "./" : '/', // 默认'/'，线上环境时候部署到任意子目录,
    // 指定生成的 index.html 的输出路径
    indexPath: 'index.html',
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: false,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    transpileDependencies: [],
    // 生产环境关闭 source map
    productionSourceMap: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        exclude: /(node_module)/,
                        rootValue: 100,
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 10 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    })
                ]
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
        config.optimization.minimizer('terser').tap((args) => {
            // 去除生产环境console
            args[0].terserOptions.compress.drop_console = true
            return args
        })
    },
    configureWebpack: config => {
        config.plugins.push(new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: {
                    app: path.join(__dirname, './src/components/common/entry-skeleton.js')
                }
            },
            minimize: true,
            quiet: true,
            router: {
                mode: 'hash',
                routes: [{
                        path: '/',
                        skeletonId: 'skeleton1'
                    },
                    {
                        path: '/about',
                        skeletonId: 'skeleton2'
                    }
                ]
            }
        }))
        if (process.env.NODE_ENV === 'production') {
            if (process.env.use_analyzer) {
                config.plugins.push(
                    new BundleAnalyzerPlugin({
                        analyzerPort: '8081'
                    })
                );
            }
            config.plugins.push(
                new CompressionPlugin({
                    // gzip压缩配置
                    test: /\.js$|\.html$|\.css/, // 匹配文件名
                    threshold: 10240, // 对超过10kb的数据进行压缩
                    deleteOriginalAssets: false, // 是否删除原文件
                })
            )
        }
    },
    devServer: {
        port: 8000,
        host: '0.0.0.0',
        hot: true,
        open: true,
        progress: true,
        clientLogLevel: 'none',
        historyApiFallback: true,
        proxy: {
            [PROXY_API]: {
                target: 'http://localhost:3000',
                pathRewrite: {
                    [PROXY_API]: ''
                },
                ws: true, // 代理的WebSockets
                changeOrigin: true, // 允许websockets跨域
            }
        }
    }
}