const fs = require("fs");
const path = require("path");
const parser = require('@babel/parser')
const tarverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");
module.exports =  class Complier {
    //options就是 config.js
    //1，获取配置
    constructor(options) {
        this.entry = options.entry;
        this.output = options.output;
    }
    run() {
        this.build(this.entry);
    }
    build(entryFile) {
        //2.从入口文件开始
        let content = fs.readFileSync(entryFile, "utf-8");
        console.log(content)
        //3.使用babel-parser将入口文件转成ast
        const ast = parser.parse(content,{
            sourceType:'module'
        })
        console.log(ast)
        //4，从ast中找出‘ImportDeclaration’类的内容
        // ImportDeclaration指的是require/import的内容

        const denpendcies = {}; //可以保留相对路径和根路径两种信息
        tarverse(ast, {
            ImportDeclaration({ node }) {
                //5.找出绝对路径
                // node.source.value; 相对路径
                const dirname = path.dirname(entryFile);
                const newPath = "./" + path.join(dirname, node.source.value);
                denpendcies[node.source.value] = newPath;
            }
        });
        //6.把ast转成代码 入口模块转换成代码
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        });
    }
}