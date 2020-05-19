class KVue {
    constructor(options) {
        // 保存选项
        this.$option = options
        this.$data = options.data
        //响应化处理
        this.observe(this.$data)


        //测试 触发依赖收集
        new Watcher(this, 'foo')
        this.foo
        new Watcher(this, 'bar.mua')
        this.bar.mua

    }

    observe(value) {
        if (!value || typeof value !== "object") {
            return;
        }
        //value 就是this.$data {foo:'aaa'}
        //key就是 'foo' ''
        Object.keys(value).forEach(key => {
            //value[key]就是'aaa'
            this.defineReactive(value, key, value[key])


            //代理$data到vue根上
            this.proxyData(key)
        })
    }

    defineReactive(obj, key, val) {
        //递归遍历 {mua:'mua'}
        this.observe(val)
        //定义一个Dep 每个dep和data中的每个key 一对一关系
        const dep = new Dep()
        //对$data以及$data的后代的每一个属性进行监听
        //当前对象，当前属性，描述符
        Object.defineProperty(obj, key, {
            get() {
                //依赖收集
                console.log(Dep.target)//就是Watcher
                //如果
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if (newVal !== val) {
                    val = newVal
                    dep.notify()
                }
            }

        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }
}
//管理所有Watcher
class Dep {
    constructor() {
        //用于存储依赖
        this.deps = []
    }

    addDep(dep) {
        //dep就是watcher实例
        //添加dep
        this.deps.push(dep)
    }

    notify() {
        //通知watcher更新
        this.deps.forEach(dep => dep.update())
    }
}
//创建watcher,保存data中的值和挂钩关系
class Watcher {
    //某个实例,和data里的key
    constructor(vm, key) {
        //创建实例时立刻将该实例只想Dep的静态属性
        Dep.target = this
        console.log('Dep.target',Dep.target)
        this.vm = vm
        this.key = key
    }

    update() {
        console.log(this)
        console.log(this.key+'更新了')
    }
}