window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);
    let durationStr = urlParams.get('duration') || '0s';
    let match = durationStr.match(/^(\d+)([smh])$/);
    let seconds = 0;
    let isTimerRunning = false;
    let interval;
    let originalSeconds = 0; // to store the original duration for reset

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
    let timerDisplay = document.getElementById('timer');

    function showNotification() {
        alert("Timer expired");
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
            timerDisplay.style.backgroundColor = ''; // reset styles
            timerDisplay.style.color = '';
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
