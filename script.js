document.addEventListener('DOMContentLoaded', (event) => {
    let coordinates = [];
    let selectingCoordinates = false;

    const trackMovementButton = document.getElementById('trackMovementButton');
    const selectByClickButton = document.getElementById('selectByClickButton');
    const downloadButton = document.getElementById('downloadButton');
    const coordinatesDisplay = document.getElementById("coordinatesDisplay");
    const clickSelectionInstructions = document.getElementById("clickSelectionInstructions");

    if (trackMovementButton) {
        trackMovementButton.addEventListener('click', function() {
            coordinatesDisplay.style.display = "block";
            document.addEventListener('mousemove', function(event) {
                document.getElementById("X").innerText = "X-coordinate: " + event.clientX;
                document.getElementById("Y").innerText = "Y-coordinate: " + event.clientY;
            });
        });
    }

    if (selectByClickButton) {
        selectByClickButton.addEventListener('click', function() {
            selectingCoordinates = true;
            clickSelectionInstructions.style.display = "block";
            downloadButton.style.display = "block";
        });
    }

    document.addEventListener('click', function(event) {
        if (selectingCoordinates && event.target !== downloadButton) {
            const x = event.clientX;
            const y = event.clientY;
            coordinates.push({ x, y });
            coordinatesDisplay.style.display = "block";
            document.getElementById("X").innerText = "Selected X-coordinate: " + x;
            document.getElementById("Y").innerText = "Selected Y-coordinate: " + y;
        }
    });

    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            let csvContent = "data:text/csv;charset=utf-8,X Coordinate,Y Coordinate\n";
            coordinates.forEach(function(coord) {
                csvContent += `${coord.x},${coord.y}\n`;
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "selected_coordinates.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
