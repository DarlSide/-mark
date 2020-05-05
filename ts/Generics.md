###泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型（传入）的一种特性。
```typescript
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```
###泛型约束
```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```
###泛型接口
```typescript
// 定义泛型接⼝口
interface Feature {
id: number;
name: string;
}
interface Result<T> {
ok: 0 | 1;
data: T[];
}
// 定义泛型函数
function getData<T>(): Result<T> {
const data: any[] = [
{ id: 1, name: "类型注解", version: "2.0" },
{ id: 2, name: "编译型语⾔言", version: "1.0" }
];
return { ok: 1, data };
}
// 使⽤用泛型
getData<Feature>().data
```
```typescript
interface Feature {
id: number;
name: string;
}
interface Result<T> {
ok: 0 | 1;
data: T[];
}

function getData<T>(): Promise<Result<T>> {
const data: any[] = [
{ id: 1, name: "类型注解", version: "2.0" },
{ id: 2, name: "编译型语⾔言", version: "1.0" }
];
return Promise.resolve<Result<T>>({ ok: 1, data });
}
async function created() {
const result = await getData<Feature>();
this.features = result.data;
}

```
###默认类型
```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```