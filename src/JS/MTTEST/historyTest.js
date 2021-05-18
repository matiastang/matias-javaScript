function popStateChange (e) {
    // todo 匹配 hash 做 dom 更新操作
    console.log(e)
    console.log(`herf=${window.location.href}`)
    console.log(`hash=${window.location.hash}`)
}

window.addEventListener('popstate', popStateChange);

function changeHistory(e){
    console.log(e)
    const state = { 'page_id': 1, 'user_id': 5 }
    const title = ''
    const url = `${window.location.origin}${window.location.pathname}#${uuid()}`
    window.history.pushState(state, title, url)
}