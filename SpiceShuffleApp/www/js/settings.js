document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Get a reference to the form element
    var form = document.querySelector("form");

    // Load saved data and populate form fields
    loadSavedData(function(savedData) {
        if (savedData) {
            // If saved data exists, populate the form fields with the saved values
            form.querySelector("[name='spice-api-ip']").value = savedData.api_ip;
            form.querySelector("[name='spice-api-port']").value = savedData.api_port;
            form.querySelector("[name='spice-api-password']").value = savedData.api_password;
        }
    });

    // Listen for the form submission event
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get values from the form fields
        var api_ip = form.querySelector("[name='spice-api-ip']").value;
        var api_port = form.querySelector("[name='spice-api-port']").value;
        var api_password = form.querySelector("[name='spice-api-password']").value;

        // Create a data object with the form values
        var data = {
            api_ip: api_ip,
            api_port: api_port,
            api_password: api_password
        };

        // Convert the data object to a JSON string
        var jsonData = JSON.stringify(data);

        // Save the JSON data to a file
        saveJSONToFile(jsonData);
    });
}

function loadSavedData(callback) {
    // Resolve the app's data directory
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(directoryEntry) {
        // Try to get the "settings.json" file
        directoryEntry.getFile("settings.json", { create: false }, function(fileEntry) {
            // Read the contents of the file
            fileEntry.file(function(file) {
                var reader = new FileReader();

                // When reading is complete
                reader.onloadend = function() {
                    // Parse the JSON data and pass it to the callback
                    var jsonData = this.result;
                    var savedData = JSON.parse(jsonData);
                    callback(savedData);
                };

                // Read the file as text
                reader.readAsText(file);
            });
        });
    }, function() {
        // Handle error, if any
        callback(null);
    });
}