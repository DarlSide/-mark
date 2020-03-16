/*下面是一个正常的递归函数。*/

function sum(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1);
    } else {
        return x;
    }
}

sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
/*上面代码中，sum是一个递归函数，参数x是需要累加的值，参数y控制递归次数。一旦指定sum递归100000次，就会报错，提示超出调用栈的最大次数。

蹦床函数（trampoline）可以将递归执行转为循环执行。*/

function trampoline(f) {
    while (f && f instanceof Function) {
        f = f();
    }
    return f;
}
/*上面就是蹦床函数的一个实现，它接受一个函数f作为参数。只要f执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。

然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。*/

function sum(x, y) {
    if (y > 0) {
        return sum.bind(null, x + 1, y - 1);
    } else {
        return x;
    }
}
/*上面代码中，sum函数的每次执行，都会返回自身的另一个版本。

现在，使用蹦床函数执行sum，就不会发生调用栈溢出。*/

trampoline(sum(1, 100000))
// 100001
// 蹦床函数并不是真正的尾递归优化，下面的实现才是。

function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);//每次将参数传入. 例如, 1 100000
        if (!active) {
            active = true;
            while (accumulated.length) {//出循环条件, 当最后一次返回一个数字而不是一个函数时, accmulated已经被shift(), 所以出循环
                value = f.apply(this, accumulated.shift());//调用累加函数, 传入每次更改后的参数, 并执行
            }
            active = false;
            return value;
        }
    };
}

var sum = tco(function(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)//重点在这里, 每次递归返回真正函数其实还是accumulator函数
    }
    else {
        return x
    }
});

sum(1, 100000);//实际上现在sum函数就是accumulator函数
// 100001