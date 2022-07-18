[参考](https://zhuanlan.zhihu.com/p/385764204)
实际场景中，经常可能出现既不resolve又不reject的Promise对象。 例如：被取消的HTTP请求等。 我们知道，JavaScript 的内存管理是基于引用计数的，出现上述情况的 Promise 对象时，并没有显式的方法告知 Promise “你将用不到了”，如此理论上如果出现大量这样的 Promise 对象，将导致内存泄漏。 然而事实是否这样呢？

测试
在NodeJS 14.x环境下，我们测试一下 Promise 的内存占用情况。

内部无回调的 Promise
我们直接看看创建10亿个既不 resolve 也不 reject 的 Promise 对象后，Heap 内存的变化情况。

测试脚本
let used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`程序启动时占用内存: ${Math.round(used * 100) / 100} MB`);

global.gc();
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`启动后GC占用内存: ${Math.round(used * 100) / 100} MB`);

for (let i = 0; i < 1000000000; ++i) {
    new Promise(rs => {
        if (Math.random() === NaN) {  // 构造一个不可能的条件            
            rs();   // 永远执行不到此处，仅为了引用一下rs()
        }
    }).then(() => {
        // 不可能执行到此处
        console.log('never resolved')
    })
};

used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Promise创建后占用内存: ${Math.round(used * 100) / 100} MB`);

global.gc();
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`GC后占用内存 ${Math.round(used * 100) / 100} MB`);
运行结果
程序启动时占用内存: 1.99 MB
启动后GC占用内存: 1.78 MB
Promise创建后占用内存: 2.34 MB
GC后占用内存 1.77 MB
创建10亿个未被释放的 Promise 对象后，内存基本毫无变化。 上面的例子，由于 Promise 内部函数里并没有任何回调等待和异步调用，所以猜测是不是 JavaScript 引擎已经做优化，自动将 Promise 释放了。

考虑到此，我们使用内部有回调等待的场景再来测试一次。

回调未完成的 Promise
测试脚本
let used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`程序启动时占用内存: ${Math.round(used * 100) / 100} MB`);

global.gc();
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`启动后GC占用内存: ${Math.round(used * 100) / 100} MB`);

let rand = Math.random();
let N = 0;
for (let i = 0; i < 1000000; ++i) {
    new Promise(rs => {
        setTimeout(() => {            
            if (rand === 999) {  // 构造一个不可能的条件            
                rs();   // 永远执行不到此处，仅为了引用一下rs()
            }
        }, 86400000);   // 等待24小时后再执行，肯定完成不了了
        ++N;
    }).then(() => {
        console.log('never resolved')
    })
};

setTimeout(() => {
    console.log(N);
    used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Promise创建后占用内存: ${Math.round(used * 100) / 100} MB`);

    global.gc();
    used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`GC后占用内存 ${Math.round(used * 100) / 100} MB`);
}, 10000); // 10秒钟后就测量内存，上面24小时的回调必定无法完成
运行结果
程序启动时占用内存: 1.99 MB
启动后GC占用内存: 1.78 MB
1000000
Promise创建后占用内存: 522.05 MB
GC后占用内存 521.98 MB
可见，内部有回调的 Promise，是会占用内存的。 并且当内部回调未完成时，这些内存会被持续挂起，即便 GC 也不会自动释放。 那么如果回调完成，但是依旧既不 resolve 又不 reject，这些内存又会如何呢？ 继续测试……

回调已完成的 Promise
测试脚本
let used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`程序启动时占用内存: ${Math.round(used * 100) / 100} MB`);

global.gc();
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`启动后GC占用内存: ${Math.round(used * 100) / 100} MB`);

let rand = Math.random();
let N = 0;
for (let i = 0; i < 1000000; ++i) {
    new Promise(rs => {
        setTimeout(() => {
            ++N;
            if (rand === 999) {  // 构造一个不可能的条件            
                rs();   // 永远执行不到此处，仅为了引用一下rs()
            }
        }, 10)   // 10毫秒后即执行，确保这里的回调肯定执行完成
    }).then(() => {
        console.log('never resolved')
    })
};

setTimeout(() => {
    console.log(N);
    used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Promise创建后占用内存: ${Math.round(used * 100) / 100} MB`);

    global.gc();
    used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`GC后占用内存 ${Math.round(used * 100) / 100} MB`);
}, 10000);  // 上面的回调等待10毫秒，这里等待10秒，确保到这里回调肯定执行完成
运行结果
程序启动时占用内存: 1.99 MB
启动后GC占用内存: 1.78 MB
1000000
Promise创建后占用内存: 522.57 MB
GC后占用内存 1.8 MB
可见，内部只要有回调的 Promise，就是会占用内存的。 但回调执行完成后，这部分内存的引用计数应该就被清零，所以 GC 后这部分内存会被自动释放。

# 结论
未执行完成的 Promise（包括内部等待的回调未完成）会占用内存。
执行完成的 Promise（包括内部等待的回调也执行完成），不占用内存，可被GC释放。
执行完成的 Promise，即便未触发 resolve 或 reject，也可以被 GC 自动释放掉。
综上，无需担心既不 resolve 也不 reject 的 Promise 对象会引发内存泄漏。