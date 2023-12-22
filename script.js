// Get references to DOM elements
const audio = document.getElementById('audio'); // Audio element
const playButton = document.getElementById('playButton'); // Play button container
const playIcon = document.getElementById('playIcon'); // Play icon
const pauseIcon = document.getElementById('pauseIcon'); // Pause icon
const overlay = document.getElementById('runners'); // Overlay image

let isPlaying = false; // Flag to track audio playing state

// Function to toggle play/pause of the audio
function toggleMusic() {
    // Check if audio is currently playing
    if (isPlaying) {
        // If playing, pause the audio, reset time, and update UI
        audio.pause();
        audio.currentTime = 0;
        playIcon.style.display = 'inline'; // Show play icon
        pauseIcon.style.display = 'none'; // Hide pause icon
        playButton.classList.remove('rotating'); // Remove rotation class
        overlay.classList.remove('running'); // Remove running animation class
    } else {
        // If not playing, start playing audio, update UI, and add animations
        audio.play();
        playIcon.style.display = 'none'; // Hide play icon
        pauseIcon.style.display = 'inline'; // Show pause icon
        playButton.classList.add('rotating'); // Add rotation class
        overlay.classList.add('running'); // Add running animation class
    }

    // Toggle the playing state
    isPlaying = !isPlaying;
}

// Event listener for when audio playback ends
audio.addEventListener('ended', function () {
    // Update UI and remove animations when audio ends
    isPlaying = false;
    playIcon.style.display = 'inline'; // Show play icon
    pauseIcon.style.display = 'none'; // Hide pause icon
    playButton.classList.remove('rotating'); // Remove rotation class
    overlay.classList.remove('running'); // Remove running animation class
});


