export default function DrawWave(canvas) {
    var ctx = canvas.getContext('2d'),
        w = canvas.width = canvas.offsetWidth,
        h = canvas.height = canvas.offsetHeight;
    var theta = 0,
        amplitude = 65,
        period = 200,
        dx = null,
        size = 8,
        yValues = [],
        timing = void 0,
        strokeWidth = 3;

    function setup() {
        dx = Math.PI * 2 / period * size;
        for (x = 0; x < Math.round(w / size) + 3; x++) {
            yValues.push(x);
        }
        draw();
        console.log(w,h,canvas.offsetWidth,canvas.offsetHeight)
    }

    function draw() {
        calcWave();
        renderWave();
        timing = requestAnimationFrame(draw);
    }

    function calcWave() {
        ctx.clearRect(0, 0, w, h);
        theta += 0.02;
        var x = theta;
    
        for (i = 0; i < yValues.length; i++) {
            yValues[i] = Math.sin(x) * amplitude;
            x += dx;
        }
    }

    function renderWave() {
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = "#333";
        for (x = 0; x < yValues.length; x++) {
            ctx.beginPath();
            ctx.moveTo(x * size - 15, 0);
            ctx.lineTo(x * size, h / 2 + yValues[x]);
            ctx.closePath();
            ctx.stroke();
    
            ctx.beginPath();
            ctx.moveTo(x * size - 30, h);
            ctx.lineTo(x * size, h / 2 + yValues[x]);
            ctx.closePath();
            ctx.stroke();
        }
    }

    setup();

}