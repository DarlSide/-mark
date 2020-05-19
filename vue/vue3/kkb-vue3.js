// 原始=> 响应式
let toProxy = new WeakMap()
// 响应式=》 原始
let toRaw = new WeakMap()

let effectStack = [] //存储effect的地方
//所有数据依赖
let targetMap = new WeakMap() // 特殊的{} key是object
//targetMao的结构

// obj.name
// {
//   target: deps :{ key:[ dep1,dep2] }
// }
// 以上 存储依赖关系 #6

function track(target, key) {
    console.log(target, key)
    // 收集依赖
    // 最后一个 就是最新的 就是最后的那个effect函数 effect时存入的函数
    const effect = effectStack[effectStack.length - 1]
    console.log(effect)
    // 最新的effect
    if (effect) {
        //target就是源对象
        console.log(target)
        /*const targetMap = {
      [target]:{
        [key]:new Set(dep)
      }
    }*/
        let depMap = targetMap.get(target)
        //depMap 从targetMap中找key为源对象的的值
        //如果没有值
        if (depMap === undefined) {
            //depMap设为一个Map
            depMap = new Map()
            //存到targetMap里
            targetMap.set(target, depMap)
        }
        //dep就是从depMap(这东西是个Map) 中找key 是参数key的值
        let dep = depMap.get(key) // obj.count  target是obj，key是count
        if (dep === undefined) {
            //如果没有 则建立一个dep 这东西就是个Set
            dep = new Set()
            //Set存入 depMap
            depMap.set(key, dep)
        }
        console.log(depMap)
        console.log(targetMap)
        // 双向存储无处不在，优化的原则
        //effect存入trackMap 重点
        if (!dep.has(effect)) {
            dep.add(effect)
            effect.deps.push(dep)
        }
    }
}

function trigger(target, key, info) {
    //源对象 当前key
    // 触发更新
    // 寻找依赖effect
    //这东西就是之前如果有get过存下的
    const depMap = targetMap.get(target)
    console.log(targetMap)
    console.log(depMap)
    if (depMap === undefined) {
        // 没有依赖
        return
    }
    //创建事件列表
    const effects = new Set()
    const computedRunners = new Set()

    if (key) {
        let deps = depMap.get(key)
        console.log(deps)
        // deps里面全部仕effect
        console.log(deps)
        deps.forEach(effect => {
            // effect()
            if (effect.computed) {
                computedRunners.add(effect)
            } else {
                effects.add(effect)
            }
        })
    }
    effects.forEach(effect => effect())
    computedRunners.forEach(computed => computed())
}

//#3 数据通知
function effect(fn, options = {}) {
    console.log('function-effect')
    // 其实就是往effectStackpush了一个effect函数，执行fn
// @todo 处理options
    let e = createReactiveEffect(fn, options)

    if (!options.lazy) {
        e()
    }

    return e
}

// #4
function createReactiveEffect(fn, options) {
    console.log('function-createReactiveEffect')
    // 构造effect
    const effect = function effect(...args) {
        return run(effect, fn, args)
    }
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy
    return effect
}

//#5
function run(effect, fn, args) {
    if (effectStack.indexOf(effect) === -1) {
        try {
            effectStack.push(effect)
            return fn(...args) // 执行 执行的时候，是要获取的
        } finally {
            effectStack.pop() // effect用完就要推出去
        }
    }
}

function computed(fn) {
    // 特殊的effect
    const runner = effect(fn, {computed: true, lazy: true})
    return {
        effect: runner,
        get value() {
            return runner()
        }
    }

}

// let obj = {name:'kkb'} // 背后有一个proxy监听 响应式

// obj.name  触发get函数
// 响应式代理
const baseHandler = {
    get(target, key) {
        // target就是obj，key就是name
        // 收集依赖 track
        // @todo
        // return target[key]
        const res = Reflect.get(target, key)
        //这个是为了后续修改用的 只是get其实没用上
        track(target, key)
        return typeof res == 'object' ? reactive(res) : res
    },
    set(target, key, val) {
        //用来diff比较
        const info = {oldValue: target[key], newValue: val}
        // obj.name = xx 这里 我们是需要通知更新的
        const res = Reflect.set(target, key, val)
        // 触发更新 重点
        trigger(target, key, info)

        return res
    }
}

// 响应式 #1  reactive就是建立一个响应式并缓存
function reactive(target) {

    // 查询缓存
    let observed = toProxy.get(target)
    if (observed) {
        return observed
    }
    if (toRaw.get(target)) {
        return target
    }
    //#2
    observed = new Proxy(target, baseHandler)
    // 设置缓存 这东西就是对象和对象背后的监听者的映射
    toProxy.set(target, observed)
    toRaw.set(observed, target)
    return observed
}




