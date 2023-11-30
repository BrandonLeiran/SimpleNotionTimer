window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);
    let durationStr = urlParams.get('duration') || '0s';
    let match = durationStr.match(/^(\d+)([smh])$/);
    let seconds = 0;
    let isTimerRunning = false;
    let interval;
    let originalSeconds = 0; // to store the original duration for reset
    let timerDisplay = document.getElementById('timer');

    function adjustFontSize() {
        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;
     
        // Aggressively adjust the font size to fill the viewable area
        // These factors (0.8 for width and 0.3 for height) can be adjusted as needed
        let fontSizeBasedOnWidth = viewportWidth * 0.9;
        let fontSizeBasedOnHeight = viewportHeight * 0.9;
     
        // Use the smaller of the two sizes to ensure the text fits both width and height
        let fontSize = Math.min(fontSizeBasedOnWidth, fontSizeBasedOnHeight);
     
        timerDisplay.style.fontSize = `${fontSize}px`;
        timerDisplay.style.lineHeight = `${viewportHeight}px`; // Centers vertically
    }   


    if (match) {
        let value = parseInt(match[1]);
        let unit = match[2];

        switch (unit) {
            case 's':
                seconds = value;
                break;
            case 'm':
                seconds = value * 60;
                break;
            case 'h':
                seconds = value * 60 * 60;
                break;
        }
    }

    originalSeconds = seconds; // store the original duration

    function showNotification() {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            new Notification("Countdown Finished!");
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    new Notification("Countdown Finished!");
                }
            });
        }
    }

    function updateDisplay(seconds) {
        let displayText;
        if (seconds < 60) {
            // For less than 60 seconds, display seconds with "s" label
            displayText = `${seconds}s`;
        } else {
            // For 60 seconds or more, display minutes with "m" label
            let minutes = Math.floor(seconds / 60);
            displayText = `${minutes}m`;
        }
        timerDisplay.textContent = displayText;
    }

    function toggleTimer() {
        if (seconds <= 0) {
            // Reset the timer
            seconds = originalSeconds;
            updateDisplay(seconds);

	    document.body.style.backgroundColor = ''; // reset to default
	    document.body.style.color = ''; // reset to default
        } else if (isTimerRunning) {
            // Pause the timer
            clearInterval(interval);
            isTimerRunning = false;
        } else {
            // Start or resume the timer
            startTimer();
            isTimerRunning = true;
        }
    }

    function startTimer() {
        interval = setInterval(function () {
            seconds--;
            updateDisplay(seconds);
            if (seconds <= 0) {
                clearInterval(interval);
                isTimerRunning = false;
                showNotification();
		document.body.style.backgroundColor = 'black'; // reset to default
		document.body.style.color = 'white'; // reset to default
            }
        }, 1000);
    }

    updateDisplay(seconds);
    adjustFontSize(); // Initial adjustment


    window.addEventListener('resize', adjustFontSize);


    // Event listener for the whole document
    document.addEventListener('click', function () {
        toggleTimer();
    });
};
