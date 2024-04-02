// Initialize the map
var map = L.map('map').setView([40.645, -73.944], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Define the bounds for Brooklyn, NY, and add it to the map
var southWest = L.latLng(40.551042, -74.05663),
    northEast = L.latLng(40.739446, -73.833365),
    bounds = L.latLngBounds(southWest, northEast);

L.rectangle(bounds, { color: "#ff7800", weight: 1 }).addTo(map);
map.fitBounds(bounds);

// URL to the CSV file hosted on GitHub
const csvUrl = 'https://mmann1123.github.io/OSM_LeaderBoard/user_node_counts.csv';

// Fetch the CSV data
fetch(csvUrl)
    .then(response => response.text())
    .then(csvText => {
        console.log("Raw CSV Text:", csvText); // Debugging Step 1

        const data = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        }).data;

        console.log("Parsed Data:", data); // Debugging Step 2

        let users = {};
        data.forEach(row => {
            console.log("Row:", row); // Additional debugging to inspect each row
            // Double-check these column names match exactly
            users[row.Username] = parseInt(row.Node_Count, 10);
        });

        console.log("Users Object:", users); // To see the final users object

        var sortedUsers = Object.keys(users).sort(function (a, b) { return users[b] - users[a]; });

        var leaderboardDiv = document.getElementById('leaderboard');
        sortedUsers.forEach(function (user) {
            var div = document.createElement('div');
            div.className = 'leaderboard-entry';
            div.innerHTML = user + ": " + users[user] + " nodes";
            leaderboardDiv.appendChild(div);
        });
    })
    .catch(error => console.error('Error fetching or parsing CSV:', error));


// // Initialize the map
// var map = L.map('map').setView([40.645, -73.944], 12);

// // Add OpenStreetMap tiles
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap contributors'
// }).addTo(map);

// // Define the bounds for Brooklyn, NY, and add it to the map
// var southWest = L.latLng(40.551042, -74.05663),
//     northEast = L.latLng(40.739446, -73.833365),
//     bounds = L.latLngBounds(southWest, northEast);

// L.rectangle(bounds, { color: "#ff7800", weight: 1 }).addTo(map);
// map.fitBounds(bounds);

// // Example leaderboard data (Replace with your data)
// var users = {
//     "mmann1123": 150,
//     "anotherUser": 200,
//     "yetAnotherUser": 120
// };

// // Sort users by count in descending order
// var sortedUsers = Object.keys(users).sort(function (a, b) { return users[b] - users[a]; });

// // Display the leaderboard
// var leaderboardDiv = document.getElementById('leaderboard');
// sortedUsers.forEach(function (user) {
//     var div = document.createElement('div');
//     div.className = 'leaderboard-entry';
//     div.innerHTML = user + ": " + users[user] + " nodes";
//     leaderboardDiv.appendChild(div);
// });
