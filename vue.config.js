'use strict'
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const cdn = {
    js: [
        'https://unpkg.com/vue@2.6.11/dist/vue.js',
        // 'https://unpkg.com/element-ui@2.15.6/lib/index.js',
        'https://unpkg.com/vue-router@3.2.0/dist/vue-router.js',
        'https://unpkg.com/vuex@3.5.1/dist/vuex.js',
        'https://unpkg.com/axios@0.20.0/dist/axios.min.js',
        'https://unpkg.com/swiper@4.5.0/dist/js/swiper.js',
        'https://unpkg.com/jquery@3.4.1/dist/jquery.js'
    ],
    css:[
        'https://unpkg.com/animate.css@3.7.2/animate.css',
        // 'https://unpkg.com/browse/swiper@4.5.0/dist/css/swiper.min.css'
        // 'https://unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css'
    ]
}

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/', // 部署应用包时的基本 url
    outputDir: 'dist', // build 构建文件目录
    assetsDir: 'static', // 静态资源目录
    lintOnSave: false, // 仅在开发模式下进行 eslint 检测代码process.env.NODE_ENV === 'development'
    productionSourceMap: false, // 禁用生产环境的 source map
    runtimeCompiler: true, // 是否运行时组件中使用 template
    devServer: {
        host: '0.0.0.0', // 默认是 localhost,可不配置
        port: 8000, // 配置端口号
        open: true, // 启动是否打开浏览器
        overlay: { // 是否在浏览器上显示编译的 errors 或 warnings
            warnings: false,
            errors: true
        },
        proxy: {
            '/': { // 被代理的接口名   http://192.168.103.165:8004 线上的 地址  http://www.jinniuzhanye.com/qd-admin   测试地址 

                target: 'http://112.124.6.107/proxyapi/', // url地址  http://47.241.243.179/proxyapi/
                // target: 'http://192.168.103.59:8004',
                // target: 'https://gameway.fun/proxyapi/',
                changeOrigin: true, // 发送请求头中 host 是否设置成 target
                pathRewrite: { // 重定向
                    '^/': '/'
                }
            },
           
            // '/proxyLogin': { // 被代理的接口名   192.168.0.129:8703  线上的 地址  http://www.jinniuzhanye.com/qd-admin   测试地址 
            //     target: 'http://192.168.103.165:8003', // url地址 http://test.future-better.com/qd-admin/   http://42.194.194.178:3000
            //     changeOrigin: true, // 发送请求头中 host 是否设置成 target
            //     pathRewrite: { // 重定向
            //         '^/proxyLogin': '/'
            //     }
            // },
            // '/proxyApi': { // 被代理的接口名   192.168.0.129:8703  线上的 地址  http://www.jinniuzhanye.com/qd-admin   测试地址 
            //     target: 'http://192.168.103.165:8002', // url地址 http://test.future-better.com/qd-admin/   http://42.194.194.178:3000
            //     changeOrigin: true, // 发送请求头中 host 是否设置成 target
            //     pathRewrite: { // 重定向
            //         '^/proxyApi': '/'
            //     }
            // },
        }
    },
    configureWebpack(config) {
        // 生产环境配置 Gzip 压缩
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new CompressionWebpackPlugin({
                    // 正则匹配需要压缩的文件后缀
                    // test: /\.(js|css|svg|woff|ttf|json|html)$/,
                    test: /\.(js|css|json|html)$/,
                    // 大于10kb的会压缩
                    threshold: 10240,
                    // 是否删除原文件
                    deleteOriginalAssets: false
                })
            )
            Object.assign(config, {
                externals: {
                    'vue': 'Vue',
                    'vue-router': 'VueRouter',
                    'vuex': 'Vuex',
                    'axios': 'axios',
                    'swiper': 'Swiper',
                    // 'element-ui': 'ElEMENT',
                    'jquery': 'jquery'
                }
            })
        }
    },
    chainWebpack(config) {
        config
            .when(process.env.NODE_ENV === 'production',
                config => {
                    config.plugin('html').tap(args => { // 引入CDN
                        args[0].cdn = cdn
                        return args
                    })
                    config.optimization.splitChunks({
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial'
                            },
                            elementUI: {
                                name: 'chunk-elementUI',
                                priority: 20,
                                test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                            },
                            commons: {
                                name: 'chunk_commons',
                                test: resolve('src/components'),
                                minChunks: 3,
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    })
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}