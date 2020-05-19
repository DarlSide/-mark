1.父组件先于子组件创建，mounted里才能访问(ref)子组件  
2.$children获得数组形式的所有子组件,但不保证顺序,也不是响应式  
3.事件的监听者与事件的派发者是同一个,谁派发谁监听
4.兄弟组件通信
```vue
// 事件的监听者与派发者都是$parent
// brother1监听
this.$parent.$on('foo', handle)
// brother2派发
this.$parent.$emit('foo')
```
5.祖代通信
```vue
provide(){
    return{
        foo:this,
//prop和provide传的值直接改会报错，像react传一个set方法来改
        setState(){
       
        }
    }
},
inject:['foo']
```
6.作用域插槽
```vue
// comp3
<div>
<slot :foo="foo"></slot>
</div>
// parent
<Comp3>
  <!-- 把v-slot的值指定为作用域上下文对象 -->
  <template v-slot:default="{foo}">
来自子组件数据：{{foo}}
  </template>
</Comp3>
```
7$attrs
```vue
//用在子组件上，就是除了props的所有属性
 v-bind="$attrs"
//避免同一个组件内的顶层容器继承属性
inheritAttrs: false,
```
8.element的dispatch
```vue
 dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        //通过循环不断往父组件查找需要派发事件的组件
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
```
9.创建组件实例挂载到body
```javascript
import Vue from "vue";
// 创建函数接收要创建组件定义
function create(Component, props) {
// 创建⼀一个Vue新实例例
const vm = new Vue({
render(h) {
// render函数将传⼊入组件配置对象转换为虚拟dom
return h(Component, { props });
}
}).$mount(); //执⾏行行挂载函数，但未指定挂载⽬目标，表示只执⾏行行初始化⼯工作
// 将⽣生成dom元素追加⾄至body  vm.$el才是dom
document.body.appendChild(vm.$el);
// 给组件实例例添加销毁⽅方法
const comp = vm.$children[0];
comp.remove = () => {

document.body.removeChild(vm.$el);
vm.$destroy();
};
return comp;
}
// 暴暴露露调⽤用接⼝口
export default create;
```
10.render
```vue
 render:function (createElement) {
 //  return <div class="{foo}"><span>aaa</span></div>
   return createElement('div',{
                        // 与 `v-bind:class` 的 API 相同，
                        // 接受⼀一个字符串串、对象或字符串串和对象组成的数组
                        'class': {
                            foo: true,
                            bar: false
                        },
                        // 与 `v-bind:style` 的 API 相同，
                        // 接受⼀一个字符串串、对象，或对象组成的数组
                        style: {
                            color: 'red',
                            fontSize: '14px'
                        },
                        // 普通的 HTML 特性
                        attrs: {
                            id: 'foo'
                        },
                        // 组件 prop
                        props: {
                            myProp: 'bar'
                        },
                        // DOM 属性
                        domProps: {
                            innerHTML: 'baz'
                        },
                        // 事件监听器器在 `on` 属性内，
                        // 但不不再⽀支持如 `v-on:keyup.enter` 这样的修饰器器。
                        // 需要在处理理函数中⼿手动检查 keyCode。
                        on: {
                            click: this.clickHandler
                        },
                        },[h('span'),'sss'])
 }
```
11.vue插件
```vue
class MyPlugin{
}
MyPlugin.install = function (Vue, options) {
// 1. 添加全局⽅方法或属性
Vue.myGlobalMethod = function () {
// 逻辑...
}
// 2. 添加全局资源
Vue.directive('my-directive', {
bind (el, binding, vnode, oldVnode) {
// 逻辑...
}
...
})
// 3. 注⼊入组件选项
Vue.mixin({
created: function () {
// 逻辑...
}
...
})
// 4. 添加实例例⽅方法
Vue.prototype.$myMethod = function (methodOptions) {
// 逻辑...
}
}
// 插件使⽤用
Vue.use(MyPlugin)
```
12.函数式组件  
没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法，只是一个接受一些 prop 的函数。  
没有响应式，没有上下文。
```vue
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```
