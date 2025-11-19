// DJ Mixing Deck - Advanced DJ Interface with Customization

// Grid helper functions - convert grid cell coordinates to pixel positions
function gridX(cellX) {
    return cellX * width / 6;
}

function gridY(cellY) {
    return cellY * height / 6;
}

// Background image
let bgImage = null;

// Track if touch was used to prevent double-triggering with mouse events
let touchUsed = false;
let touchTimeout = null;

// Crossfader (0 = only track 1, 100 = only track 2, 50 = both)
let crossfader = null;
let crossfaderValue = 50;

// Background file input
let bgFileInput = null;

// Track 1 - all properties together
let track1 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    sliderPosition: {
        x: 0,
        y: 0
    },
    timeSlider: null,
    timeSliderPosition: {
        x: 0,
        y: 0
    },
    button: null,
    buttonPosition: {
        x: 0,
        y: 0
    },
    buttonLabel: "Track 1",
    fileInput: null,
    isDraggingTime: false,
    pulseSize: 80,
    amp: null
};

// Track 2 - all properties together
let track2 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    sliderPosition: {
        x: 0,
        y: 0
    },
    timeSlider: null,
    timeSliderPosition: {
        x: 0,
        y: 0
    },
    button: null,
    buttonPosition: {
        x: 0,
        y: 0
    },
    buttonLabel: "Track 2",
    fileInput: null,
    isDraggingTime: false,
    pulseSize: 80,
    amp: null
};

function preload() {
    // Load the sound files
    track1.sound = loadSound('assets/sound1.mp3');
    track2.sound = loadSound('assets/sound2.mp3');
}

function setup() {
    createCanvas(800, 600);
    
    track1.amp = new p5.Amplitude();
    track2.amp = new p5.Amplitude();
    
    // Calculate positions using grid helper functions
    // Row 2: buttons
    // Row 3: volume sliders
    // Row 4: time sliders
    // Row 5: crossfader
    
    // Track 1: column 1
    track1.buttonPosition.x = gridX(1);
    track1.buttonPosition.y = gridY(2);
    track1.sliderPosition.x = gridX(1);
    track1.sliderPosition.y = gridY(3);
    track1.timeSliderPosition.x = gridX(1);
    track1.timeSliderPosition.y = gridY(4);
    
    // Track 2: column 4
    track2.buttonPosition.x = gridX(4);
    track2.buttonPosition.y = gridY(2);
    track2.sliderPosition.x = gridX(4);
    track2.sliderPosition.y = gridY(3);
    track2.timeSliderPosition.x = gridX(4);
    track2.timeSliderPosition.y = gridY(4);
    
    setupFileInputs();
    setupTrackButton(track1);
    setupTrackButton(track2);
    setupTrackSliders(track1);
    setupTrackSliders(track2);
    setupCrossfader();
    
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
    
    track1.amp.setInput(track1.sound);
    track2.amp.setInput(track2.sound);
}

function setupFileInputs() {
    // Row 0: background (column 1) - 6x6 grid (center of row 0)
    bgFileInput = createFileInput(handleBackgroundImage);
    bgFileInput.position(gridX(1) - 60, gridY(1) / 2);
    bgFileInput.attribute('accept', 'image/*');
    
    // Row 1: track 1 (column 1) and track 2 (column 4) (center of row 1)
    track1.fileInput = createFileInput(function(file) {
        handleSoundUpload(file, track1);
    });
    track1.fileInput.position(gridX(1) - 60, gridY(1));
    track1.fileInput.attribute('accept', 'audio/*');
    
    track2.fileInput = createFileInput(function(file) {
        handleSoundUpload(file, track2);
    });
    track2.fileInput.position(gridX(4) - 60, gridY(1));
    track2.fileInput.attribute('accept', 'audio/*');
}

function setupTrackButton(track) {
    track.button = createButton("▶⏸");
    track.button.position(track.buttonPosition.x, track.buttonPosition.y);
    track.button.mousePressed(function() {
        // Only trigger if touch wasn't used recently (prevents double-triggering on mobile)
        if (!touchUsed) {
            toggleTrack(track);
        }
    });
    // Use touchStarted with proper event prevention
    track.button.touchStarted(function(e) {
        // Prevent mouse event from firing
        touchUsed = true;
        toggleTrack(track);
        // Clear flag after a delay to allow next interaction
        if (touchTimeout) clearTimeout(touchTimeout);
        touchTimeout = setTimeout(function() {
            touchUsed = false;
        }, 400);
        // Prevent default to stop mouse event
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        return false;
    });
}

function setupTrackSliders(track) {
    track.slider = createSlider(0, 100, 50);
    track.slider.position(track.sliderPosition.x, track.sliderPosition.y);
    
    track.timeSlider = createSlider(0, 100, 0);
    track.timeSlider.position(track.timeSliderPosition.x, track.timeSliderPosition.y);
    track.timeSlider.input(function() {
        // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
        // if (!track.sound) {
        //     return;
        // }
        
        let soundDuration = track.sound.duration();
        // Safety check: prevents division by zero if duration is 0 (not needed for basic workshop)
        // if (soundDuration > 0) {
            let targetTime = (track.timeSlider.value() / 100) * soundDuration;
            track.sound.jump(targetTime);
        // }
    });
}

function setupCrossfader() {
    crossfader = createSlider(0, 100, 50);
    crossfader.position(width / 2 - 100, gridY(5));
    crossfader.style('width', '200px');
}


function formatTime(seconds) {
    // Convert seconds to MM:SS format
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    // Use string padding with math: padStart ensures 2 digits
    let minutesStr = String(minutes).padStart(2, '0');
    let secsStr = String(secs).padStart(2, '0');
    return minutesStr + ":" + secsStr;
}

function draw() {
    drawBackground();
    
    // Draw grid: 6x6 cells, each cell is 1/6 width x 1/6 height
    drawGrid();
    
    // Draw title - center of row 0 (matching part2 UI)
    fill(0);
    textAlign(CENTER);
    textSize(min(width, height) * 0.04);
    text("DJ Mixing Deck", width / 2, gridY(1) / 2);
    
    drawLabels();
    drawTimeDisplay(track1);
    drawTimeDisplay(track2);
    
    updateVolumes();
    applyCrossfader();
    
    updateTimeSliders();
    drawBPMVisualization();
}

function drawBackground() {
    if (bgImage) {
        image(bgImage, 0, 0, width, height);
    } else {
        background(255);
    }
}

function drawLabels() {
    fill(0);
    textAlign(CENTER);
    
    // Upload labels - matching part2 UI style
    textSize(min(width, height) * 0.025);
    text("Upload Background:", gridX(1), gridY(1) / 2 - 10);
    text("Upload Track 1:", gridX(1), gridY(1) - 10);
    text("Upload Track 2:", gridX(4), gridY(1) - 10);
    
    // Volume labels - matching part2 UI style
    textSize(min(width, height) * 0.025);
    text("Volume", track1.sliderPosition.x, track1.sliderPosition.y - 20);
    text("Volume", track2.sliderPosition.x, track2.sliderPosition.y - 20);
    
    // Duration labels and crossfader label - same size as volume text
    textSize(min(width, height) * 0.025);
    text("duration", track1.timeSliderPosition.x, track1.timeSliderPosition.y - 15);
    text("duration", track2.timeSliderPosition.x, track2.timeSliderPosition.y - 15);
    text("crossfader", width / 2, gridY(5) - 20);
}

function drawTimeDisplay(track) {
    // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
    // if (!track.sound) {
    //     return;
    // }
    
    let elapsed = track.sound.currentTime();
    let total = track.sound.duration();
    let timeText = formatTime(elapsed) + " / " + formatTime(total);
    
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(timeText, track.timeSliderPosition.x, track.timeSliderPosition.y + 35);
}

function updateVolumes() {
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
    
    // Note: Volume is actually set by the crossfader function, not here
    // These checks are safety checks (not needed for basic workshop):
    // if (track1.sound && track1.sound.isPlaying()) {
    //     // Volume will be set by crossfader
    // }
    // if (track2.sound && track2.sound.isPlaying()) {
    //     // Volume will be set by crossfader
    // }
}

function applyCrossfader() {
    crossfaderValue = crossfader.value();
    let angle = (crossfaderValue / 100) * (PI / 2);
    
    let track1CrossfadeVolume = track1.volume * cos(angle);
    let track2CrossfadeVolume = track2.volume * sin(angle);
    
    // Safety checks: prevent errors if sounds aren't loaded yet (not needed for basic workshop)
    // if (track1.sound) {
        track1.sound.setVolume(track1CrossfadeVolume);
    // }
    // if (track2.sound) {
        track2.sound.setVolume(track2CrossfadeVolume);
    // }
}

function updateTimeSliders() {
    updateTimeSlider(track1);
    updateTimeSlider(track2);
}

function updateTimeSlider(track) {
    // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
    // if (!track.sound) {
    //     return;
    // }
    
    let currentTime = track.sound.currentTime();
    let soundDuration = track.sound.duration();
    
    // Safety check: prevents division by zero if duration is 0 (not needed for basic workshop)
    // if (soundDuration > 0) {
        let progress = (currentTime / soundDuration) * 100;
        track.timeSlider.value(progress);
    // }
}

function drawBPMVisualization() {
    track1.pulseSize = getPulseSize(track1);
    track2.pulseSize = getPulseSize(track2);
    
    // Beat visuals centered on play/pause button positions
    drawBeatCircle(track1.buttonPosition.x, track1.buttonPosition.y, track1.pulseSize, [255, 0, 0], "beat visual 1");
    drawBeatCircle(track2.buttonPosition.x, track2.buttonPosition.y, track2.pulseSize, [0, 0, 255], "beat visual 2");
}

function getPulseSize(track) {
    // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
    // let level = (track.sound && track.amp) ? track.amp.getLevel() : 0;
    let level = track.amp ? track.amp.getLevel() : 0;
    return Math.max(80, 80 + (level * 400));
}

function drawBeatCircle(x, y, size, color, label) {
    noFill();
    stroke(color[0], color[1], color[2], 150);
    strokeWeight(3);
    circle(x, y, size);
}

function drawGrid() {
    stroke(200); // Light gray color for grid lines
    strokeWeight(1);
    
    // Draw vertical lines (6 columns) using gridX
    for (let i = 1; i < 6; i++) {
        let x = gridX(i);
        line(x, 0, x, height);
    }
    
    // Draw horizontal lines (6 rows) using gridY
    for (let i = 1; i < 6; i++) {
        let y = gridY(i);
        line(0, y, width, y);
    }
}

// Removed getAmplitudeFromPeaks() - now using p5.Amplitude.getLevel() instead
// This is the proper p5.js API for getting amplitude levels

function toggleTrack(track) {
    // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
    // if (!track.sound) {
    //     return;
    // }
    
    if (track.sound.isPlaying()) {
        pauseTrack(track);
    } else {
        playTrack(track);
    }
}

function pauseTrack(track) {
    // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
    // if (!track.sound) {
    //     return;
    // }
    
    track.sound.pause();
    track.isPlaying = false;
}

function playTrack(track) {
    // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
    // if (!track.sound) {
    //     return;
    // }
    
    track.sound.setVolume(track.volume);
    track.sound.setLoop(true);
    track.sound.play();
    track.isPlaying = true;
    
    connectAmplitudeAnalyzer(track);
}

function connectAmplitudeAnalyzer(track) {
    track.amp.setInput(track.sound);
}

function mousePressed() {
    // Check if user is clicking on time sliders
    // if (track1.timeSlider && mouseX >= track1.timeSliderPosition.x &&
    //     mouseX <= track1.timeSliderPosition.x + 150 &&
    //     mouseY >= track1.timeSliderPosition.y && 
    //     mouseY <= track1.timeSliderPosition.y + 20) {
        track1.isDraggingTime = true;
    // }
    
    // if (track2.timeSlider && mouseX >= track2.timeSliderPosition.x &&
    //     mouseX <= track2.timeSliderPosition.x + 150 &&
    //     mouseY >= track2.timeSliderPosition.y && 
    //     mouseY <= track2.timeSliderPosition.y + 20) {
        track2.isDraggingTime = true;
    // }
}

function mouseReleased() {
    // Stop dragging time sliders
    track1.isDraggingTime = false;
    track2.isDraggingTime = false;
}

function mouseDragged() {
    // Keep dragging flag active while dragging
    // if (track1.timeSlider && mouseX >= track1.timeSliderPosition.x &&
    //     mouseX <= track1.timeSliderPosition.x + 150 &&
    //     mouseY >= track1.timeSliderPosition.y && 
    //     mouseY <= track1.timeSliderPosition.y + 20) {
        track1.isDraggingTime = true;
    // }
    
    // if (track2.timeSlider && mouseX >= track2.timeSliderPosition.x &&
    //     mouseX <= track2.timeSliderPosition.x + 150 &&
    //     mouseY >= track2.timeSliderPosition.y && 
    //     mouseY <= track2.timeSliderPosition.y + 20) {
        track2.isDraggingTime = true;
    // }
}

function handleBackgroundImage(file) {
    // if (file.type === 'image') {
        bgImage = loadImage(file.data);
    // }
}

function handleSoundUpload(file, track) {
    stopTrack(track);
    
    track.sound = loadSound(file.data);
    track.sound.setVolume(track.volume);
    
    track.timeSlider.value(0);
    
    setTimeout(function() {
        connectAmplitudeAnalyzer(track);
    }, 100);
}

function stopTrack(track) {
    // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
    // if (!track.sound) {
    //     return;
    // }
    
    track.sound.stop();
    track.isPlaying = false;
}
