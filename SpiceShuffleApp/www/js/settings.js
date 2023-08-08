document.addEventListener("deviceready", onDeviceReady, false);

// Define a global variable to hold the saved data
window.savedData = null;

function onDeviceReady() {
    // Lock the screen orientation to portrait
    screen.orientation.lock("portrait");

    var form = document.querySelector("form");

    loadSavedData(function(data) {
        if (data) {
            // Store the saved data in the global variable
            window.savedData = data;

            form.querySelector("[name='spice-api-ip']").value = data.api_ip;
            form.querySelector("[name='spice-api-port']").value = data.api_port;
            form.querySelector("[name='spice-api-password']").value = data.api_password;

            // Access savedData properties within the callback
            console.log(data.api_ip);
            console.log(data.api_port);
        }
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var api_ip = form.querySelector("[name='spice-api-ip']").value;
        var api_port = form.querySelector("[name='spice-api-port']").value;
        var api_password = form.querySelector("[name='spice-api-password']").value;

        var data = {
            api_ip: api_ip,
            api_port: api_port,
            api_password: api_password
        };

        var jsonData = JSON.stringify(data);

        saveJSONToFile(jsonData, function(success) {
            if (success) {
                console.log("Data saved successfully!");
                // Update the global savedData variable
                window.savedData = data;
            } else {
                console.error("Failed to save data.");
            }
        });
    });
}