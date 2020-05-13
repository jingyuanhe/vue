const path = require('path')
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 100
                    })
                ]
            }
        }
    },
    configureWebpack: config => {
        config.plugins.push(new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: {
                    app: path.join(__dirname, './src/common/entry-skeleton.js')
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
    }
}