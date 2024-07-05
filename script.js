document.addEventListener('DOMContentLoaded', (event) => {
    let coordinates = [];
    let selectingCoordinates = false;

    document.getElementById('trackMovementButton').addEventListener('click', function() {
        const coordinatesDisplay = document.getElementById("coordinatesDisplay");
        coordinatesDisplay.style.display = "block";
        document.addEventListener('mousemove', function(event) {
            document.getElementById("X").innerText = "X-coordinate: " + event.clientX;
            document.getElementById("Y").innerText = "Y-coordinate: " + event.clientY;
        });
    });

    document.getElementById('selectByClickButton').addEventListener('click', function() {
        selectingCoordinates = true;
        document.getElementById("clickSelectionInstructions").style.display = "block";
        document.getElementById("downloadButton").style.display = "block";
    });

    document.addEventListener('click', function(event) {
        if (selectingCoordinates && event.target !== document.getElementById('downloadButton')) {
            const x = event.clientX;
            const y = event.clientY;
            coordinates.push({ x, y });
            document.getElementById("coordinatesDisplay").style.display = "block";
            document.getElementById("X").innerText = "Selected X-coordinate: " + x;
            document.getElementById("Y").innerText = "Selected Y-coordinate: " + y;
        }
    });

    document.getElementById('downloadButton').addEventListener('click', function() {
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
});
