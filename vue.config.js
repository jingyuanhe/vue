const path = require('path')
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

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
        
    }
}