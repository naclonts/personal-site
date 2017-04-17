
var Mandelbrot = function(w, h, ctx) {
    this.width = w;
    this.height = h;
    this.ctx = ctx;
    
    this.panX = 2.0;
    this.panY = 1.5;
    this.px = Math.floor(Math.sqrt(w * h)) / 35;
    this.magnification = 250;
    this.limit = 10;
    this.baseHue = 200;
    this.hueVariation = 30;
    
    this.drawOrder = [];
};
Mandelbrot.prototype.constructor = Mandelbrot;

Mandelbrot.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
    this.px = Math.floor(Math.sqrt(width * height)) / 35;
};

Mandelbrot.prototype.valueAt = function(x, y) {
    var real = x;
    var imag = y;
    for (var i=0; i < this.limit; i++) {
        var real2 = real * real - imag * imag + x;
        var imag2 = 2 * real * imag + y;
        real = real2;
        imag = imag2;
        if (real * imag > 5)
            return (i/this.limit * 100);
    }
    return 0;
};

// draw the full set
Mandelbrot.prototype.drawAll = function() {
    this.clear();
    for (var x=0; x < this.width; x+=this.px) {
        for (var y=0; y < this.height; y+=this.px) {
            this.drawSquare(x, y);
        }
    }   
};

Mandelbrot.prototype.clear = function() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);
};

// Gradually (randomly) fill in mandelbrot. interval: wait time in ms.
Mandelbrot.prototype.randomFillAll = function(interval) {    
    this.drawOrder = this.randomDrawOrder();
    this.animationInterval = interval;
    this.randomCell();
};

Mandelbrot.prototype.randomCell = function() { 
    console.log(this.drawOrder.length);
    var point = this.drawOrder.pop();
    this.drawSquare(point.x * this.px, point.y * this.px);
    
    if (this.drawOrder.length > 0)
        window.setTimeout(this.randomCell.bind(this), this.animationInterval);
};
    
Mandelbrot.prototype.drawSquare = function(x1, y1) {
    var lumin = this.valueAt(x1/this.magnification - this.panX,
                             y1/this.magnification - this.panY);

    // Set to dim luminosity rather than black
    if (lumin < 5) {
        lumin = 5;
        var hue = this.baseHue;
    } else {
        var hue = this.baseHue + Math.random() * this.hueVariation;
    }
    
    var style = 'hsla(' + hue + ', 100%, ' + lumin + '%, 1)';
    this.ctx.fillStyle = style;

    // Add 1 to avoid border aliasing (?)
    this.ctx.fillRect(x1, y1, this.px+1, this.px+1);
}


Mandelbrot.prototype.randomDrawOrder = function() {
    var points = [];
    var xlen = Math.floor(this.width / this.px);
    var ylen = Math.floor(this.height / this.px);
    for (var x=0; x < xlen; x++) {
        for (var y=0; y < ylen; y++) {
            var point = { x: x, y: y };
            points.push(point);
        }
    }
    return (this.shuffle(points));
}

Mandelbrot.prototype.shuffle = function(arrayToShuffle) {
    var j, x, i;
    var a = arrayToShuffle.slice();
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}


window.addEventListener('load', function() {
    var canvas1 = document.getElementById('canvas1');
    var canvas2 = document.getElementById('canvas2');
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas1.width = w;
    canvas1.height = h;
    canvas2.width = w;
    canvas2.height = h;
    var ctx1 = canvas1.getContext('2d');
    var ctx2 = canvas2.getContext('2d');
    
    ctx1.fillStyle = 'black';
    ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
    
    var m1 = new Mandelbrot(w, h, ctx1);
//    m1.randomFillAll(200);
    m1.drawAll();
    
    var m2 = new Mandelbrot(w, h, ctx2);
    m2.baseHue = m1.baseHue - 40;
    m2.drawAll();
    
    // Redraw on resize
    window.addEventListener('resize', function() {
        m1.setSize(window.innerWidth, window.innerHeight);
        m1.drawAll();
        m2.setSize(window.innerWidth, window.innerHeight);
        m2.drawAll();
    });
    
    // Set up slider
    var s = document.getElementById('color-slider');
    s.addEventListener('input', function() {
        var hue = this.value * 1;
        m1.baseHue = hue;
        m1.drawAll();
        m2.baseHue = hue - 40;
        m2.drawAll();
        document.getElementById('color-slider-container').style.backgroundColor =
            'hsla(' + hue + ', 63%, 22%, 0.6)';
    });
    
    // Set up scroll handling
    scrollHandlerSetup();
}, false);


var lastScrollPosition = 0;

// Set up scroll handler (to avoid transform3d with position: fixed bug)
function scrollHandlerSetup() {
    window.addEventListener('scroll', function(e) {
        if (window.pageYOffset)
            lastScrollPosition = window.pageYOffset;
        else // IE
            lastScrollPosition = document.documentElement.scrollTop;
        
        var canvasses = document.getElementsByClassName('fractal-canvas');
        for (var i=0; i < canvasses.length; i++) {
            canvasses[i].style.top = lastScrollPosition + 'px';
        }
    });
}

