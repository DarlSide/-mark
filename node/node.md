###fs
```javascript
const fs = require('fs');
// 同步调用
const data = fs.readFileSync('./conf.js'); //代码会阻塞在这里
// 异步调用
fs.readFile('./conf.js', (err, data) => {
  if (err) throw err;
    //buffer
  console.log(data);
});
// fs常常搭配path api使用
const path = require('path')
fs.readFile(path.resolve(__dirname,'./node.md'), (err, data) => {
    if (err) throw err;
    console.log(data);
});
```
###http
```javascript
//打开localhost:3000
const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
    const {url, method,headers} = request;
    if (url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                // 设置响应头
                response.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8'
                });
                //设置响应body
                response.end('500，服务器错误');
                return ;
            }
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        });
    }else if (method == "GET" && url == "/api/users") {
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify([{ name: "tom", age: 20 }]));
      } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        //响应图片请求
        //判断时图片的话 用流 来加载图片
        fs.createReadStream('.'+url).pipe(response);
      }else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain;charset=utf-8');
        response.end('404, 页面没有找到');
    }
});
server.listen(3000);
```
###流式操作
```javascript
//复制文件
const fs = require('fs')
const rs = fs.createReadStream('./conf.js')
const ws = fs.createWriteStream('./conf2.js')
rs.pipe(ws)
```
###socket
```javascript
const net = require('net')
const chatServer = net.createServer()
const clientList = []
chatServer.on('connection',client => {
    client.write('Hi!\n')
    clientList.push(client)
    client.on('data',data => {
        console.log('receive:',data.toString())
        clientList.forEach(v => {
            v.write(data)
        })
    })
})
chatServer.listen(9000)
```
###埋点
```javascript
   const img = new Image()
   img.src='/api/users?abc=123'
```
###跨域
只针对浏览器  
只有XMLHttpRequest时会发生  
协议地址端口 三者有一个不同 即为不同源
###CORS
通过设置响应头解决
```javascript
//响应简单请求: 动词为get/post/head，没有自定义请求头
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
```
```javascript
//需要响应浏览器发出的options请求（预检请求）
if (method == "OPTIONS" && url == "/api/users") {
         //预检
          res.writeHead(200, {
           "Access-Control-Allow-Origin": "http://localhost:3000",
           "Access-Control-Allow-Headers": "X-Token,Content-Type",//请求头里的属性
           "Access-Control-Allow-Methods": "PUT"//方法
          });
          res.end();
      }
```
###接收application/x-www-form-urlencoded
用流来接收
```javascript
if (method === "POST" && url === "/api/save") {
 let reqData = [];
 let size = 0;
 req.on('data', data => {
  reqData.push(data);
  size += data.length;
});
 req.on('end', function () {
  const data = Buffer.concat(reqData, size);
  res.end(`formdata:${data.toString()}`)
});
}
```
###接收上传
```javascript
const server = http.createServer((request, response) => {
   const { pathname } = require('url').parse(request.url)
    if (pathname === '/upload') {
        console.log('upload....')
        const fileName = request.headers['file-name'] ? request.headers['file-name'] : 'abc.png'
        const outputFile = path.resolve(__dirname, fileName)
        const fis = fs.createWriteStream(outputFile)
        //1.buffer的方式参考上面
        //2.流的方式
        request.pipe(fis)
        response.end()
        //3.流事件
        /*
   request.on('data', data => {
            console.log('data:',data)
            fis.write(data)
        })
        request.on('end', () => {
            fis.end()
            response.end()
        })
*/
}
})
```
###下载
```javascript
 if (method === 'GET'&&url === '/api.download') {
    fs.readFile('./file.pdf',(err, data) => {
    res.setHeader('Content-Type','application/pdf')
    const fileName = encodeURL('中文')
    res.setHeader('Content-Disposition',`attachment; filename='${fileName}.pdf'`)
    res.end(data)
})
}
```