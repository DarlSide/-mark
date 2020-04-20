1.ls 显示目录内容列表（Windows:dir）
 - a 显示所有文件及目录 (ls 内定将文件名或目录名称开头为"."的视为隐藏档，不会列出)
 - A 同 -a ,但不列出 "." (目前目录) 及 ".." (父目录)
 - R 若目录下有文件,则以下之文件亦皆依序列出
 
2.rm 删除文件/目录
 - i 删除前逐一询问确认
 - r 或-R：递归处理，将指定目录下的所有文件与子目录一并处理
 - f：强制删除文件或目录

3.tail 查看文件内容
 - tail -f filename 会把 filename 文件里的最尾部的内容显示在屏幕上，并且不断刷新，只要 filename 更新就可以看到最新的文件内容。
 
4 mv 文件移动/改名
```linux
mv app.js app2.js
mv app.js /app
```
 - i: 若指定目录已有同名文件，则先询问是否覆盖旧文件
 - f: 在 mv 操作要覆盖某已有的目标文件时不给任何指示

5.touch  新建文件
```linux
touch app.js
```

6.which 查找文件
```linux
which nginx
```

7.cp 复制文件/目录
```linux
cp [options] source dest
# or
cp [options] source... directory
```
 - f：覆盖已经存在的目标文件而不给出提示。
 - r：若给出的源文件是一个目录文件,此时将复制该目录下所有的子目录和文件。
 
8.cd 切换工作目录  

9.pwd 显示工作目录  

10.mkdir 创建目录
 - p 确保目录名称存在,不存在的就建一个。
 
11.rmdir 删除空目录
```linux
rmdir [-p] dirName
```
 - p 是当子目录被删除后使它也成为空目录的话,则顺便一并删除。
 
12.cat 看文件内容  

13.ping 检测主机
 - c <完成次数> 设置完成要求回应的次数。
 
14.telnet 端口是否可访问
```linux
talent www.baidu.com 8888
```
15.grep 找关键字  

16.ps 显示当前进程状态
 - e 显示所有进程。
 - f 全格式。  
 
17.kill 杀死进程
```linus
kill [-s <信息名称或编号>][程序]　或　kill [-l <信息编号>]
```
18.top 实时显示进程动态
```linux
top -pid 4712
```
19.clear 清除屏幕

20.find 查找文件
```linux
find path -option [ -print ] [ -exec -ok command ] {} \;
```
21.curl 文件传输
 - 调试请求
 ```linux
    curl localhost:2222/api/vl/index 
```



 
 


