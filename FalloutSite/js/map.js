const wrapper = document.getElementById("mapWrapper");
const content = document.getElementById("mapContent");
const image = document.getElementById("pipboyMap");

let scale = 1;
let minScale = 1;
const maxScale = 4;

let posX = 0;
let posY = 0;

let startX = 0;
let startY = 0;
let dragging = false;

function fitToScreen() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const imgWidth = image.naturalWidth;
    const imgHeight = image.naturalHeight;

    const scaleX = wrapperRect.width / imgWidth;
    const scaleY = wrapperRect.height / imgHeight;

    scale = Math.min(scaleX, scaleY);
    minScale = scale;

    posX = (wrapperRect.width - imgWidth * scale) / 2;
    posY = (wrapperRect.height - imgHeight * scale) / 2;

    updateTransform();
}

function clampPosition() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const contentWidth = image.naturalWidth * scale;
    const contentHeight = image.naturalHeight * scale;

    const minX = wrapperRect.width - contentWidth;
    const minY = wrapperRect.height - contentHeight;

    if (contentWidth <= wrapperRect.width) {
        posX = (wrapperRect.width - contentWidth) / 2;
    } else {
        posX = Math.min(0, Math.max(minX, posX));
    }

    if (contentHeight <= wrapperRect.height) {
        posY = (wrapperRect.height - contentHeight) / 2;
    } else {
        posY = Math.min(0, Math.max(minY, posY));
    }
}

function updateTransform() {
    clampPosition();
    content.style.transform =
        `translate(${posX}px, ${posY}px) scale(${scale})`;
}

image.onload = fitToScreen;
window.addEventListener("resize", fitToScreen);

// ZOOM
wrapper.addEventListener("wheel", (e) => {
    e.preventDefault();

    const zoomAmount = 0.15;
    const direction = e.deltaY > 0 ? -1 : 1;
    const newScale = scale + direction * zoomAmount;

    if (newScale < minScale || newScale > maxScale) return;

    scale = newScale;
    updateTransform();
});

// DRAG
wrapper.addEventListener("mousedown", (e) => {
    if (scale <= minScale) return; // no dragging unless zoomed
    dragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
});

window.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    updateTransform();
});

window.addEventListener("mouseup", () => {
    dragging = false;
});