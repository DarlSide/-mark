###loader
loader就是一个函数 在返回处理后的代码
```javascript
module.exports = function(source) {
return source.replace('aaa','bbb')
};
```
```
//配置
module: {
    rules: [
    {
        test: /\.js$/,
        use: path.resolve(__dirname,
        "./loader/replaceLoader.js")
        },
        options: {
        //配置参数
        name: "开课吧"
        }
    ]
}
```
使用loader-utils来处理  
 - this.query
 - this.callback
 - this.async


###plugin
```javascript
class CopyrightWebpackPlugin {
constructor(options) {
    //参数
}
//compiler：webpack实例例
apply(compiler) {
//hooks.emit 定义在某个时刻
compiler.hooks.emit.tapAsync(
"CopyrightWebpackPlugin",
(compilation, cb) => {
compilation.assets["copyright.txt"] = {
source: function() {
return "hello copy";
},
size: function() {
return 20;
}
};
cb();
}
);
}
}
module.exports = CopyrightWebpackPlugin;
```
```
const CopyrightWebpackPlugin = require("./plugin/copyright-
webpack-plugin");
plugins: [new CopyrightWebpackPlugin('传参')]
```
