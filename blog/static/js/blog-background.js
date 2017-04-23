window.addEventListener("load", windowLoadHandler, false);

//for debug messages
var Debugger = function() { };
Debugger.log = function(message) {
	try {
		console.log(message);
	}
	catch (exception) {
		return;
	}
}

function windowLoadHandler() {
    if (!canvasSupport) return;
    backgroundLines();
//  roughLines();
//	gradientFractals();
    scrollHandlerSetup();
}

function backgroundLines() {
    var dim = getWindowSize();
    var windowHeight = dim.height;
    var windowWidth = dim.width;
    var lineHeight = 20;
    var numLines = windowHeight / lineHeight;

    var baseHue = 97;
    var sat = 70;
    var lum = 50;
    var ctx = document.getElementById('background-canvas').getContext('2d');

    for (var i=0; i < numLines; i++) {
        var hue = baseHue + Math.floor(Math.random() * 25);
        lum += Math.random() * 50 - 25;
        lum = Math.min(Math.max(lum, 20), 50);
        sat += Math.random() * 15 - 10;
        sat = Math.max(sat, 30);
        ctx.fillStyle = 'hsl(' + hue + ',' + sat + '%,' + lum + '%)';
        ctx.fillRect(0, i * lineHeight, windowWidth, lineHeight);
    }
}

function canvasSupport() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}


function getWindowSize() {
    var w = 0, h = 0;
    
    if (typeof(window.innerWidth) == 'number') {
        // Non-IE
        w = Math.min(window.innerWidth, document.body.clientWidth);
        h = window.innerHeight;
    } else if (document.documentElement &&
               (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight))  {
        //IE 4 compatible
        w = document.body.clientWidth;
        h = document.body.clientHeight;
    }
    
    return { width: w,
             height: h };
}

var lastScrollPosition = 0;

// Set up scroll handler (to avoid transform3d with position:fixed bug)
function scrollHandlerSetup() {
    window.addEventListener('scroll', function (e) {
        if (window.pageYOffset)
            lastScrollPosition = window.pageYOffset;
        else // IE
            lastScrollPosition = document.documentElement.scrollTop;
        
        var canvas = document.getElementById('background-canvas');
        canvas.style.top = lastScrollPosition + 'px';
    });
}
