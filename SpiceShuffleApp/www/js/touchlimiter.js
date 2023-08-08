document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Maximum number of simultaneous touches allowed
    const maxTouches = 2;

    // Keep track of active touches
    let activeTouches = 0;

    document.addEventListener("touchstart", function(event) {
        // Increment activeTouches when a touch starts
        activeTouches++;

        // If activeTouches exceeds the maximum allowed, preventDefault to prevent further touches
        if (activeTouches > maxTouches) {
            event.preventDefault();
        }
    });

    document.addEventListener("touchend", function() {
        // Decrement activeTouches when a touch ends
        activeTouches--;
    });
}
