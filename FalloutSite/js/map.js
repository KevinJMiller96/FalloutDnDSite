const wrapper = document.getElementById("mapWrapper");
const mapImage = document.getElementById("pipboyMap");

let scale = 1;
const MIN_SCALE = 1;
const MAX_SCALE = 3;

let originX = 0;
let originY = 0;

let startX = 0;
let startY = 0;
let isDragging = false;

function clampPosition() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const imageWidth = mapImage.naturalWidth * scale;
    const imageHeight = mapImage.naturalHeight * scale;

    const minX = wrapperRect.width - imageWidth;
    const minY = wrapperRect.height - imageHeight;

    originX = Math.min(0, Math.max(minX, originX));
    originY = Math.min(0, Math.max(minY, originY));
}

function updateTransform() {
    clampPosition();
    mapImage.style.transform =
        `translate(${originX}px, ${originY}px) scale(${scale})`;
}

// Wait for image load
mapImage.onload = () => {
    updateTransform();
};

// ZOOM
wrapper.addEventListener("wheel", (e) => {
    e.preventDefault();

    const zoomAmount = 0.15;
    const direction = e.deltaY > 0 ? -1 : 1;

    const newScale = scale + direction * zoomAmount;

    // Hard clamp zoom
    if (newScale < MIN_SCALE || newScale > MAX_SCALE) return;

    scale = newScale;

    updateTransform();
});

// DRAG
wrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - originX;
    startY = e.clientY - originY;
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    originX = e.clientX - startX;
    originY = e.clientY - startY;

    updateTransform();
});

window.addEventListener("mouseup", () => {
    isDragging = false;
});