(function(graph){
        function require(module){
            function localRequire(relativePath){
                //这里递归是为了找其他模块
                //把相对路径转成了项目中的路径
                console.log(relativePath)
                console.log(require(graph[module].dependencies[relativePath]))
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
        require('./src/index.js') //./src/index.js
    })({"./src/index.js":{"dependencies":{"./hello.js":"./src\\hello.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\ndocument.write(\"hello\" + (0, _hello.say)(\"webpack\")); //hello webpack"},"./src\\hello.js":{"dependencies":{"./a.js":"./src\\a.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nvar _a = require(\"./a.js\");\n\nfunction say(str) {\n  return str + (0, _a.add)();\n}"},"./src\\a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.add = add;\n\nfunction add() {\n  return \"add\";\n} //./src/index.js"}})