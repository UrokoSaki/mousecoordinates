document.addEventListener('DOMContentLoaded', () => {
    let coordinates = [];
    let selectingCoordinates = false;
    let requestId = null;

    const trackMovementButton = document.getElementById('trackMovementButton');
    const selectByClickButton = document.getElementById('selectByClickButton');
    const downloadButton = document.getElementById('downloadButton');
    const coordinatesDisplay = document.getElementById("coordinatesDisplay");
    const clickSelectionInstructions = document.getElementById("clickSelectionInstructions");
    const xCoord = document.getElementById("X");
    const yCoord = document.getElementById("Y");

    if (trackMovementButton) {
        trackMovementButton.addEventListener('click', startTracking);
    }

    function startTracking() {
        coordinatesDisplay.style.display = "block";
        document.addEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(event) {
        if (!requestId) {
            requestId = requestAnimationFrame(() => {
                updateMousePosition(event);
                requestId = null;
            });
        }
    }

    function updateMousePosition(event) {
        xCoord.innerText = "X-coordinate: " + event.clientX;
        yCoord.innerText = "Y-coordinate: " + event.clientY;
    }

    if (selectByClickButton) {
        selectByClickButton.addEventListener('click', startSelecting);
    }

    function startSelecting() {
        selectingCoordinates = true;
        clickSelectionInstructions.style.display = "block";
        downloadButton.style.display = "block";
    }

    document.addEventListener('click', (event) => {
        if (selectingCoordinates && event.target !== downloadButton) {
            const x = event.clientX;
            const y = event.clientY;
            coordinates.push({ x, y });
            updateSelectedCoordinatesDisplay(x, y);
        }
    });

    function updateSelectedCoordinatesDisplay(x, y) {
        coordinatesDisplay.style.display = "block";
        xCoord.innerText = "Selected X-coordinate: " + x;
        yCoord.innerText = "Selected Y-coordinate: " + y;
    }

    if (downloadButton) {
        downloadButton.addEventListener('click', downloadCoordinates);
    }

    function downloadCoordinates() {
        const csvContent = "data:text/csv;charset=utf-8,X Coordinate,Y Coordinate\n" +
            coordinates.map(coord => `${coord.x},${coord.y}`).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "selected_coordinates.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});
