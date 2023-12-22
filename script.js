const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const overlay = document.getElementById('runners');

let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        audio.currentTime = 0;
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        playButton.classList.remove('rotating');
        overlay.classList.remove('running');
    } else {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        playButton.classList.add('rotating');
        overlay.classList.add('running');
    }

    isPlaying = !isPlaying;
}

audio.addEventListener('ended', function () {
    isPlaying = false;
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    playButton.classList.remove('rotating');
    overlay.classList.remove('running');
});

