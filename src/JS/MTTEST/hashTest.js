function hashUpdate (e) {
    // todo 匹配 hash 做 dom 更新操作
    console.log(e)
    console.log(`herf=${window.location.href}`)
    console.log(`hash=${window.location.hash}`)
}

window.addEventListener('hashchange', hashUpdate);

function changeHash(e){
    console.log(e)
    window.location.hash = uuid()
}