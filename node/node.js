// /http/api.js
const http = require("http");
const fs = require("fs");
http
    .createServer((req, res) => {
        const { method, url } = req;
        console.log(url)
        if (method == "GET" && url == "/") {
            fs.readFile("./index.html", (err, data) => {
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            });
        } else if (method == "GET" && url == "/api/users") {
            res.setHeader('Set-Cookie', 'cookie1=va222;')
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify([{ name: "tom", age: 20 }]));
        }
    })
    .listen(3000);