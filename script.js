// Get references to DOM elements
const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const overlay = document.getElementById('runners');
const countdownEl = document.getElementById('countdown');
const speedButtons = document.querySelectorAll('.speed-btn');

const speeds = {
    slow:   { seconds: 41.5, src: 'Banjo_Timer_Slow.mp3' },    // add this file or change name
    medium: { seconds: 25.4,  src: 'Banjo_Timer_Medium.mp3' },      // existing file used as medium
    fast:   { seconds: 11.4,  src: 'Banjo_Timer_Fast.mp3' }   // add this file or change name
};

let currentSpeed = 'medium';
let remaining = speeds[currentSpeed].seconds;
let timerInterval = null;
let isPlaying = false; // Flag to track audio playing state

function updateCountdown() {
    const display = Math.max(0, Math.floor(remaining));
    countdownEl.textContent = `${display}s`;
}

// set active button UI
function updateSpeedButtons() {
    speedButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.speed === currentSpeed);
    });
}

function setSpeed(speedKey) {
    if (!speeds[speedKey]) return;
    currentSpeed = speedKey;
    remaining = speeds[currentSpeed].seconds;
    updateCountdown();
    updateSpeedButtons();

    // update the text label under the buttons
    updateButtonLabel();

    // set overlay revolution duration to match timer length
    overlay.style.animationDuration = `${speeds[currentSpeed].seconds}s`;

    // If overlay is currently running, restart its animation so new duration takes effect
    if (overlay.classList.contains('running')) {
        overlay.classList.remove('running');
        // force reflow so removing the class takes effect before re-adding
        void overlay.offsetWidth;
        overlay.classList.add('running');
    }

    // If currently playing, restart playback with the new audio and timer
    if (isPlaying) {
        audio.src = speeds[currentSpeed].src;
        audio.currentTime = 0;
        audio.play().catch(() => {});
        clearInterval(timerInterval);
        startTimer();
    } else {
        audio.src = speeds[currentSpeed].src;
    }
}

// Add this function near other helpers in the file
function updateButtonLabel() {
    const labelEl = document.getElementById('button-label');
    if (!labelEl) return;
    const labels = {
        fast: 'Panic Mode!',
        medium: 'Race Pace',
        slow: 'No Rush'
    };
    labelEl.textContent = labels[currentSpeed] || '';
}

function startTimer() {
    // ensure any existing interval cleared
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            stopMusic();
        } else {
            updateCountdown();
        }
    }, 1000);
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    playButton.classList.remove('rotating');
    overlay.classList.remove('running');

    clearInterval(timerInterval);
    timerInterval = null;

    // reset remaining to configured duration for the current speed
    remaining = speeds[currentSpeed].seconds;
    updateCountdown();
}

function toggleMusic() {
    if (isPlaying) {
        stopMusic();
        return;
    }

    // start playback and timer
    audio.src = speeds[currentSpeed].src;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
    playButton.classList.add('rotating');

    // ensure overlay uses current speed duration, then start its animation
    overlay.style.animationDuration = `${speeds[currentSpeed].seconds}s`;
    // restart animation to ensure it begins at 0 with the correct duration
    overlay.classList.remove('running');
    void overlay.offsetWidth;
    overlay.classList.add('running');

    remaining = speeds[currentSpeed].seconds;
    updateCountdown();
    startTimer();

    isPlaying = true;
}

// Stop timer/play if audio ends (keeps UI consistent)
audio.addEventListener('ended', function () {
    stopMusic();
});

// wire up speed buttons
speedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setSpeed(btn.dataset.speed);
    });
});

// initialize UI
updateCountdown();
updateSpeedButtons();
updateButtonLabel(); // <-- ensure label shows initial selection
// ensure audio and overlay are set to current speed on load
audio.src = speeds[currentSpeed].src;
overlay.style.animationDuration = `${speeds[currentSpeed].seconds}s`;


