//tsc hello.ts

//用 void 表示没有任何返回值的函数
function alertName(): void {
    alert('My name is Tom');
}

//类型推论
let something;
// let something: any;
let something2 = "xx"


//联合类型
let myFavoriteNumber: string | number;
function getString(something: string | number): string {
    return something.toString();
}

//接口
//赋值的时候，变量的形状必须和接口的形状保持一致
interface Person {
    readonly name: string; //只读属性
    age?: number;//可选属性
}

let tom: Person = {
    name: 'Tom',
    age: 25
};

//数组
let fibonacci: number[] = [1, 1, 2, 3, 5];
// let fibonacci: Array<number> = [1, 1, 2, 3, 5];

//函数
function sum(x: number = 1, y?: number): number {
    return x + y;
}
//rest
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

//类型断言
/*
联合类型可以被断言为其中一个类型
父类可以被断言为子类
任何类型都可以被断言为 any
any 可以被断言为任何类型
* */
//值 as 类型

//声明文件
// declare let/const/function/class

//类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
let a:NameOrResolver

//字符串字面量类型
type EventNames = 'click' | 'scroll' | 'mousemove';

//元组
let tom2: [string, number] = ['Tom', 25];

//枚举
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};