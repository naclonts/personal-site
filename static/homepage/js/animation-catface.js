var CatFace = function(canvas) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.numTeeth = 5;
};
CatFace.prototype.constructor = CatFace;

CatFace.prototype.draw = function() {
    this.ctx.strokeStyle = '#555';
    this.ctx.fillStyle = '#eee';
    this.ctx.lineWidth = '2';

    var w = this.width;
    var h = this.height;
    var mouthLeft = w * 0.4;
    var mouthRight = w * 0.6;
    var mouthTop = h * 0.55;
    var mouthBottom = h * 0.75;

    this.ctx.beginPath();
    // bottom lip
    this.ctx.moveTo(mouthLeft, mouthTop);
    this.ctx.bezierCurveTo(w * 0.45, h * 0.75, w * 0.55, h * 0.75, mouthRight, mouthTop);
    this.ctx.stroke();

    // upper lip
    // this.ctx.moveTo(w * 0.4, h * 0.55);
    this.ctx.bezierCurveTo(w * 0.55, h * 0.6, w * 0.45, h * 0.6, mouthLeft, mouthTop);
    this.ctx.stroke();
    this.ctx.fill();

    // left eye
    this.drawEye(w*0.42, h*0.4, w * 0.05);
    this.drawEye(w*0.58, h*0.4, w * 0.05);
};

CatFace.prototype.drawEye = function(cx, cy, radius) {
    this.ctx.fillStyle = 'hsl(78, 79%, 36%)';
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);

    // outer eye
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.fill();

    // pupil
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - radius);
    this.ctx.quadraticCurveTo(cx - radius, cy, cx, cy + radius);
    this.ctx.quadraticCurveTo(cx + radius, cy, cx, cy - radius);
    this.ctx.fillStyle = '#555';
    this.ctx.fill();
};


window.addEventListener('load', function() {
    var canvas = document.getElementById('catface');

    var cat = new CatFace(canvas);
    cat.draw();
});
