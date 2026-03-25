function initMap()
{
    const map = document.getElementById("pipboyMap");
    const container = document.getElementById("mapContent");

    let scale = 1;
    let minScale = 1;
    let maxScale = 5;

    let isDragging = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;

    function updateTransform() {
        map.style.transform =
            `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    /* ZOOM */
    container.addEventListener("wheel", (e) => {

        e.preventDefault();

        const zoomSpeed = 0.1;

        if (e.deltaY < 0) {
            scale += zoomSpeed;
        } else {
            scale -= zoomSpeed;
        }

        scale = Math.max(minScale, Math.min(maxScale, scale));

        clampPosition();
        updateTransform();

    }, { passive: false });

    /* DRAG START */
    map.addEventListener("mousedown", (e) => {

        isDragging = true;
        map.style.cursor = "grabbing";

        startX = e.clientX - translateX;
        startY = e.clientY - translateY;

    });

    /* DRAG END */
    window.addEventListener("mouseup", () => {

        isDragging = false;
        map.style.cursor = "grab";

    });

    /* DRAG MOVE */
    window.addEventListener("mousemove", (e) => {

        if (!isDragging) return;

        translateX = e.clientX - startX;
        translateY = e.clientY - startY;

        clampPosition();
        updateTransform();

    });

    /* KEEP IMAGE INSIDE CONTAINER */
    function clampPosition() {

        const rect = container.getBoundingClientRect();

        const imgWidth = rect.width * scale;
        const imgHeight = rect.height * scale;

        const maxX = (imgWidth - rect.width) / 2;
        const maxY = (imgHeight - rect.height) / 2;

        translateX = Math.min(maxX, Math.max(-maxX, translateX));
        translateY = Math.min(maxY, Math.max(-maxY, translateY));
    }

}