const fs = require("fs");
const path = require("path");
const { getAst, getDependcies, getCode } = require("./parser.js");

//获取配置 根据配置信息启动webpack，执行构建
//1.从入口模块开始分析
// 有哪些依赖
// 转换代码

//2.递归的分析其他依赖模块
//有哪些依赖
//转换代码

//3.生成可以在浏览器端执行的bundle文件

module.exports = class Complier {
  //options就是 config.js
  //1，获取配置
  constructor(options) {
    this.entry = options.entry;
    this.output = options.output;
    this.modules = [];
  }
  run() {
    //2.获取入口 依赖的相对路径/绝对路径 转化好的代码
    const info = this.build(this.entry);
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      //如果有依赖 继续获得依赖的 路径和代码
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.build(dependencies[j]));
        }
      }
    }
    //此时modules 就是所有的代码和路径
    //转换数据结构 把文件名做key
    const obj = {};
    this.modules.forEach(item => {
      obj[item.fileName] = {
        dependencies: item.dependencies,
        code: item.code
      };
    });
    //生成代码文件
    this.file(obj);
  }
  build(fileName) {
    //入口文件路径
    let ast = getAst(fileName);
    //
    let dependencies = getDependcies(ast, fileName);
    let code = getCode(ast);
    return {
      fileName,
      dependencies,
      code
    };
  }
  file(code) {
    //获取输出信息的文件命和路径 .../dist/main.js
    const filePath = path.join(this.output.path, this.output.filename);
    //前面处理的所有代码的json
    const newCode = JSON.stringify(code);
    /*
    * graph:就是newCode
    * require函数 执行的函数主体
    * localRequire函数 因为浏览器不认识require 自己实现
    * relativePath参数： 是相对路径
    * bundle函数最后再main.js 就是可以直接在浏览器运行的函数
    * */
    const bundle = `(function(graph){
        function require(module){
            function localRequire(relativePath){
                //这里递归是为了找其他模块
                //把相对路径转成了项目中的路径
                console.log(relativePath)
               return require(graph[module].dependencies[relativePath])
            }
            //exports 用来存储其他模块
            var exports = {};
            (function(require,exports,code){
                //这里require和exports是因为code里有这俩函数 所以要提供这个参数
                eval(code)
            })(localRequire,exports,graph[module].code)
            //必须返回
            return exports;
        }
        require('${this.entry}') //./src/index.js
    })(${newCode})`;
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
};
