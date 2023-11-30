window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);
    let seconds = parseInt(urlParams.get('duration')) || 0;
    let timerDisplay = document.getElementById('timer');
    let interval;

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
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let secondsLeft = seconds % 60;
        timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        interval = setInterval(function() {
            seconds--;
            updateDisplay(seconds);
            if (seconds <= 0) {
                clearInterval(interval);
                showNotification();
            }
        }, 1000);
    }

    document.getElementById('start').onclick = function () {
        clearInterval(interval);
        startTimer();
    };

    document.getElementById('stop').onclick = function () {
        clearInterval(interval);
    };

    document.getElementById('reset').onclick = function () {
        clearInterval(interval);
        seconds = parseInt(urlParams.get('duration')) || 0;
        updateDisplay(seconds);
    };

    updateDisplay(seconds);
};
