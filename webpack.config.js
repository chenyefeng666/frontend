const path = require('path'); //内置的node模块
const htmlWP = require('html-webpack-plugin'); //html插件

module.exports = {
    // 入口,打包谁配置谁
    entry: path.resolve(__dirname, './src/main.js'),

    // 输出，配置打包后文件的输出路径，以及打包后的js文件名
    output: {
        path: path.resolve(__dirname, './dist'),
        // 捆绑配置名字
        filename: 'bundle.js'
    },

    plugins: [
        // 自动打包js注入到html里面
        new htmlWP({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],

    module: {
        // 非js模块的处理规则
        rules: [
            // css模块
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            // less模块
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // 静态资源引入模块
            {
                test: /\.(gif|png|jpg|svg|mp3|mp4|avi|ttf|woff)$/,
                use: [
                    // 小于10kb的才打包
                    {
                        loader: 'url-loader',
                        options: { limit: 10240 }
                    }
                ]
            },

            // js模块
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //第三方的js不需要语法转换，所以排除掉
            },
            // vue模块
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    //webpack-dev-server的配置
    // 自动打包服务
    devServer: {
        open: true, //服务启动后自动打开浏览器
        port: 8888, //服务端口号
        contentBase: 'dist' //启动的服务目录
    }
}