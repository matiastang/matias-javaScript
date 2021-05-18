/*
 * @Descripttion: 
 * @version: 
 * @Author: matias tang
 * @Date: 2020-09-21 17:48:22
 * @LastEditors: matias tang
 * @LastEditTime: 2020-09-25 14:07:05
 */
// https://www.cnblogs.com/wyq178/p/9976815.html
class node {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.preNode = null
        this.nextNode = null
    }
}

class LRU {
    constructor(size) {
        this.currentSize = 0
        this.capcity = size
        this.caches = []
        this.first = null
        this.last = null
    }

    push(key, value) {
        let cachesNode = this.caches.filter(function(item, index, cachesArr) {
            return item.key === key
        })
        // if (this.caches.) {

        // }
    }
}