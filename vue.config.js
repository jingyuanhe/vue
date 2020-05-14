const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
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
    }
}