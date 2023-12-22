const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const progress = document.getElementById('progress');

let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        audio.currentTime = 0;
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        playButton.classList.remove('rotating');
        resetProgress();
    } else {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        playButton.classList.add('rotating');
        updateProgress();
    }

    isPlaying = !isPlaying;
}

audio.addEventListener('ended', function () {
    isPlaying = false;
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    playButton.classList.remove('rotating');
    resetProgress();
});

function updateProgress() {
    progress.style.clipPath = 'circle(100% at center)';
}

function resetProgress() {
    progress.style.clipPath = 'circle(0% at center)';
}
