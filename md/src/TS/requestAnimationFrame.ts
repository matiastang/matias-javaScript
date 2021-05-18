let element:HTMLElement | null
let startStamp: DOMHighResTimeStamp | undefined

// document.ready = () => {
//     rotate()
// }

window.onload = () => {
    console.log('onload')
    rotate()
}

function rotate() {
    element = document.getElementById('animate')
    requestAnimationFrame(animate)
}

function animate(timestamp: DOMHighResTimeStamp) {
    if (startStamp == undefined) {
        startStamp = timestamp
    }
    const elapsed = timestamp - startStamp
    if (element != null) {
        element.style.transform = `rotate(${0.01 * elapsed}deg)`
    }
    requestAnimationFrame(animate)
}