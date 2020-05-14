const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const PROXY_API = process.env.VUE_APP_PROXY_API
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        exclude: /(node_module)/,
                        rootValue: 100,
                        mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 10 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    })
                ]
            }
        }
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
                routes: [
                    {path: '/',skeletonId: 'skeleton1'},
                    {path: '/about',skeletonId: 'skeleton2'}
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
              target: 'http://localhost:8000',
              pathRewrite: {[PROXY_API] : ''},
              ws: true, // 代理的WebSockets
              changeOrigin: true, // 允许websockets跨域
            }
        }
    }
}