function initWave()
{
    const canvas = document.getElementById("waveCanvas");
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let time = 0;

    function resizeWave(force = false) {
        const nextWidth = canvas.offsetWidth;
        const nextHeight = canvas.offsetHeight;

        if (!force && nextWidth === width && nextHeight === height) {
            return;
        }

        canvas.width = nextWidth;
        canvas.height = nextHeight;
        width = nextWidth;
        height = nextHeight;
    }

    window.addEventListener("resize", () => resizeWave(true));
    window.resizeWaveCanvas = () => resizeWave(true);

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
        resizeWave();

        if (!width || !height) {
            requestAnimationFrame(drawWave);
            return;
        }

        ctx.clearRect(0, 0, width, height);
        drawGrid();

        ctx.strokeStyle = "#00ff66";
        ctx.lineWidth = 2;
        ctx.beginPath();

        const centerY = height / 2;
        const active = window.isRadioActive ? window.isRadioActive() : false;

        for (let x = 0; x < width; x++) {
            let y = centerY;

            if (active) {
                const noise =
                    Math.sin((x * 0.02) + time) * 30 +
                    Math.sin((x * 0.07) + time * 1.7) * 20 +
                    Math.sin((x * 0.15) + time * 2.3) * 10;

                const chaos = (Math.random() - 0.5) * 25;
                y += noise + chaos;
            }

            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        if (active) {
            time += 0.15;
        }

        requestAnimationFrame(drawWave);
    }

    resizeWave(true);
    drawWave();
}
