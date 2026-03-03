const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let time = 0;

function resizeWave() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    width = canvas.width;
    height = canvas.height;
}

window.addEventListener("resize", resizeWave);
window.resizeWaveCanvas = resizeWave;
function drawGrid() {
    ctx.strokeStyle = "rgba(0,255,100,0.2)";
    for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }
}

function drawWave() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();

    ctx.strokeStyle = "#00ff66";
    ctx.lineWidth = 2;
    ctx.beginPath();

    let centerY = height / 2;
    let active = window.isRadioActive ? window.isRadioActive() : false;

    for (let x = 0; x < width; x++) {
        let y = centerY;

        if (active) {
            y += Math.sin((x * 0.03) + time) * 20
                + Math.sin((x * 0.11) + time * 1.5) * 15
                + (Math.random() * 20 - 10);
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();

    if (active) time += 0.08;

    requestAnimationFrame(drawWave);
}

drawWave();