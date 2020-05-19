###new Vue()
1.init() 初始化
 - initMixin()
   - initLifecycle： children等
   - initEvents：事件监听初始化
   - initRender：定义$createElement
   - initInjections: 获取注⼊入数据并做响应化
   - initState：**初始化props,methods,data,computed,watch等**
   - initProvide：注⼊入数据处理理
 - stateMixin：实现 $data,$props,$set,$delete,$watch
 - eventsMixin(Vue)：实现 $on,$emit,$off,$once
 - lifecycleMixin(Vue)：实现_update,$forceUpdate,$destroy
 - renderMixin(Vue)：_render $nextTick
 
2.$mount 挂载组件
 - 创建根组件，创建一个Watcher,与更新函数进行挂钩
 - 优先级render/template(需编译)/dom  最终挂载的还是render
3_.compile 编译 vue-loader
 - parse: 解析指令和模板语法生成AST
 - optimize: 标记静态节点，diff时略过/渲染树不需要创建新节点
 - generate：把AST转成render
4.render生成虚拟dom树/存入监听器（Watcher）
 - 执行渲染函数时，会进行依赖收集,当依赖变化时，通知watcher进行更新
4_.watcher 监听器，数据修改后通知watcher进行修改
5.diff算法,比较DOM树的差异,patch(dom操作)
 - 通过diff算法比较出修改的部分，就不用更新整个组件，达到节约性能的目的
 - 同层级进行,广度优先,O(n)
 - 判断增删改
 - 根据tagName 和 key判断
   - 类型相同时 判断属性，文本，子节点是否更新  
   - 字节点重排 new/old + start/end + index
   
6.更新dom (真实与虚拟dom是映射关系)

###数据响应
1.数据拦截(Object.defineProperty/Proxy)
2.depend 中间层 因为Watcher会有很多,负责管理Wathcer dep和Watcher是多对多关系
3.观察者Watcher (一般一个组件一个Watcher)
4.更新
 - 异步 队列 nextTick
 - 方案 优先Promise 平台 环境兼容 
 
5.数组处理
 - 找出7个改变元素的操作[push,pop,shift,unshift,splice,sort,reverse]
 - 其他方式(操作数组内元素/添加删除属性)不会响应 需要set