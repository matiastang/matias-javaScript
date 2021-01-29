/*
 * @Author: tangdaoyong
 * @Date: 2021-01-29 10:57:21
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-01-29 12:00:09
 * @Description: file content
 */
function create(Con,...args){
    //1、创建一个空的对象
    let obj = {}; // let obj = Object.create({});
    //2、将空对象的原型prototype指向构造函数的原型
    Object.setPrototypeOf(obj,Con.prototype); // obj.__proto__ = Con.prototype
    //3、改变构造函数的上下文（this）,并将剩余的参数传入，此时就就将构造函数中的熟悉和方法等挂载到`obj`对象上了。
    console.log('绑定this前');
    let result = Con.apply(obj,args);
    console.log('绑定this后');
    console.log(result);
    //4、在构造函数有返回值的情况进行判断
    return result instanceof Object?result:obj;
    /*
    构造函数可能有返回，所有需要步骤4的判断。
    注意一下上面两个返回值的差异

    function Person(name){
    this.name = name;
    return 1; // return undefined/NaN/'string'/null
    }
    let me = new Person('快乐每一天');
    console.log(me); // { name:'快乐每一天' }


    function Person(name){
    this.name = name;
    return { age:12 };
    }
    let me = new Person('快乐每一天');
    console.log(me); // { age:12 }
    */
}



function Person(name) {
    console.log(`Person name is ${name}`);
    this.name = name
    this.age = 10;
    this.getName = function() {
        return this.name;
    }
}

function Person2(name) {
    console.log(`Person2 name is ${name}`);
    let obj = {};
    obj.name = name
    obj.age = 10;
    obj.getName = function() {
        return this.name;
    }
    obj.__proto__ = Person2.prototype;

    return obj
}

// let matias = create(Person, 'tangdaoyong');
/*
使用`Person2`，则`matias`的原型是`obj`的原型，所以需要设置`obj.__proto__ = Person2.prototype;`
*/
let matias = create(Person2, 'tangdaoyong');
matias.name = 'matias';
console.log(Person.prototype);
console.log(matias.__proto__);
console.log(matias.name);
console.log(matias.getName());

let tdy = new Person('tdy');
console.log(tdy.__proto__);
console.log(tdy.name);
console.log(tdy.getName());

function Person3(name) {
    console.log(`Person3 name is ${name}`);
    let obj = {};
    obj.name = name
    obj.age = 10;
    obj.getName = function() {
        return this.name;
    }
    /*
    如果使用`new Person3('tang')`则this会被指定为一个空对象，则`Object.prototype == tang.__proto__  true`。
    使用`Person3('yong');`则this为执行上下文，如window
    */
    console.log(this);
    console.log(Object.prototype == tang.__proto__);
    console.log(this == window);
    obj.__proto__ = this.prototype;

    return obj
}

let tang = new Person3('tang');
console.log(tang.__proto__);
console.log(tang.name);
console.log(tang.getName());

let yong = Person3('yong');
console.log(yong.__proto__);
console.log(yong.name);
console.log(yong.getName());