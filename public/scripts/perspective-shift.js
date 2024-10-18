let container = document.getElementById('shift-container');
let inner = document.getElementById('shift-inner');

let counter = 0;
let updateRate = 10;
let isTimeToUpdate = function() {
    return counter++ % updateRate === 0;
};

console.log("perspective script loaded!...");

// -------------------------------
// Mouse
let mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,

    updatePosition: function(event) {
        let e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
    },

    setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth/2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight/2);
    },

    show: function() { return '(' + this.x + ', ' + this.y + ')'; }
}

// Track the mouse position relative to the center of the container.
mouse.setOrigin(container);
// ---------------------

let update = function(event) {
    mouse.updatePosition(event);
    updateTransformStyle(
        (mouse.y / inner.offsetHeight/2).toFixed(2),
        (mouse.x / inner.offsetWidth/2).toFixed(2)
    );
};

let updateTransformStyle = function(x, y) {
    let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    inner.style.transform = style;
    inner.style.mozTransform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
};

// ------------------------------------
container.addEventListener("mouseenter", function(event) {
    update(event);
    console.log('please work');
});
container.addEventListener("mouseleave", function() {
    inner.style = "";
});
container.addEventListener("mousemove", function(event) {
   if (isTimeToUpdate()) update(event);
});