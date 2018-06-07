var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.texture.height) {
        if (b.x > o.x && b.x < o.x + o.texture.width) {
            return true
        }
    }
    return false
}
const randomRange = (start, end) => {
    n = Math.floor(Math.random() * (end - start + 1)) + start
    return n
}