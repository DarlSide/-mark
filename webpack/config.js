const path = require('path')
//生成html
const htmlWebpackPlugin = require("html-webpack-plugin");
//清除打包的内容
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
    //入口文件
    entry: './src/index.js',
    //输出结构
    output: {
        //利利⽤用占位符，⽂文件名称不不要重复
        filename: "[name][chunkhash:8].js",
        //输出⽂文件到磁盘的⽬目录，必须是绝对路路径
        path: path.resolve(__dirname, "dist"),
        //当前的构建环境
    },
    devServer:{
        contentBase: "./dist",
        open: true,
        port: 8081,
        hot:true,
    },
    mode: 'production',
    module: {
        rules: [
            //babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            //处理图片
            {
            test: /\.(png|jpe?g|gif)$/,
//use使⽤用⼀一个loader可以⽤用对象，字符串串，两个loader需要⽤用数组
            use: {
                loader: "file-loader",
// options额外的配置，⽐比如资源名称
                options: {
// placeholder 占位符 [name]⽼老老资源模块的名称
// [ext]⽼老老资源模块的后缀
// https://webpack.js.org/loaders/file-loader#placeholders
                    name: "[name]_[hash].[ext]",
                    //打包后的存放位置
                    outputPath: "images/"
                }
            }
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: {
                loader: "url-loader",
                options: {
                    name: "[name]_[hash].[ext]",
                    outputPath: "images/",
//⼩小于2048，才转换成base64
                    limit: 2048
                }
            }
        }]
    },
    plugins:[
        new htmlWebpackPlugin({
            title: "My App",
            filename: "app.html",
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ]


}