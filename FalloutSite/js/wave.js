const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let time = 0;

function resizeWave() {
    const nextWidth = canvas.offsetWidth;
    const nextHeight = canvas.offsetHeight;

    if (!nextWidth || !nextHeight) {
        return;
    }

    canvas.width = nextWidth;
    canvas.height = nextHeight;
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
    const radioWindowActive = window.isRadioWindowActive ? window.isRadioWindowActive() : false;

    if ((!width || !height) && radioWindowActive) {
        resizeWave();
    }

    ctx.clearRect(0, 0, width, height);

    if (radioWindowActive) {
        drawGrid();
    }

    const stationSelected = window.isRadioActive ? window.isRadioActive() : false;
    const shouldDrawWave = radioWindowActive && stationSelected;

    if (shouldDrawWave) {
        ctx.strokeStyle = "#00ff66";
        ctx.lineWidth = 2;
        ctx.beginPath();

        const centerY = height / 2;

        for (let x = 0; x < width; x++) {
            let y = centerY;

            const noise =
                Math.sin((x * 0.02) + time) * 30 +
                Math.sin((x * 0.07) + time * 1.7) * 20 +
                Math.sin((x * 0.15) + time * 2.3) * 10;

            const chaos = (Math.random() - 0.5) * 25;

            y += noise + chaos;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
        time += 0.15;
    }

    requestAnimationFrame(drawWave);
}

drawWave();
