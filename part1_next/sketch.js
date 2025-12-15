// DJ Mixing Deck - Simple DJ Interface with Customization

// Grid helper functions - convert grid cell coordinates to pixel positions
function gridX(cellX) {
    return cellX * width / 6;
}

function gridY(cellY) {
    return cellY * height / 6;
}

// Background image
let bgImage = null;

// Background file input
let bgFileInput = null;

// Track if touch was used to prevent double-triggering with mouse events
let touchUsed = false;
let touchTimeout = null;

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
    button: null,
    buttonPosition: {
        x: 0,
        y: 0
    },
    buttonLabel: "Track 1",
    fileInput: null
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
    button: null,
    buttonPosition: {
        x: 0,
        y: 0
    },
    buttonLabel: "Track 2",
    fileInput: null
};

function preload() {
    // Load the sound files
    track1.sound = loadSound('assets/sound1.mp3');
    track2.sound = loadSound('assets/sound2.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Calculate positions using grid helper functions
    // Row 2: buttons
    // Row 3: sliders
    
    // Track 1: column 1
    track1.buttonPosition.x = gridX(1);
    track1.buttonPosition.y = gridY(2);
    track1.sliderPosition.x = gridX(1);
    track1.sliderPosition.y = gridY(3);
    
    // Track 2: column 4
    track2.buttonPosition.x = gridX(4);
    track2.buttonPosition.y = gridY(2);
    track2.sliderPosition.x = gridX(4);
    track2.sliderPosition.y = gridY(3);
    
    // Create file inputs aligned to grid cells (6x6 grid)
    // Background: row 0, column 1 (center of row 0)
    bgFileInput = createFileInput(handleBackgroundImage);
    bgFileInput.position(gridX(1) - 60, gridY(1) / 2);
    bgFileInput.attribute('accept', 'image/*');
    
    // Track 1: row 1, column 1 (center of row 1)
    track1.fileInput = createFileInput(function(file) {
        handleSoundUpload(file, track1);
    });
    track1.fileInput.position(gridX(1) - 60, gridY(1));
    track1.fileInput.attribute('accept', 'audio/*');
    
    // Track 2: row 1, column 4 (center of row 1)
    track2.fileInput = createFileInput(function(file) {
        handleSoundUpload(file, track2);
    });
    track2.fileInput.position(gridX(4) - 60, gridY(1));
    track2.fileInput.attribute('accept', 'audio/*');
    
    // Create play button for track 1
    track1.button = createButton("▶⏸");
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    track1.button.mousePressed(function() {
        // Only trigger if touch wasn't used recently (prevents double-triggering on mobile)
        if (!touchUsed) {
            toggleTrack(track1);
        }
    });
    // Use touchStarted with proper event prevention
    track1.button.touchStarted(function(e) {
        // Prevent mouse event from firing
        touchUsed = true;
        toggleTrack(track1);
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
    
    // Create play button for track 2
    track2.button = createButton("▶⏸");
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    track2.button.mousePressed(function() {
        // Only trigger if touch wasn't used recently (prevents double-triggering on mobile)
        if (!touchUsed) {
            toggleTrack(track2);
        }
    });
    // Use touchStarted with proper event prevention
    track2.button.touchStarted(function(e) {
        // Prevent mouse event from firing
        touchUsed = true;
        toggleTrack(track2);
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
    
    // Create volume slider for track 1
    track1.slider = createSlider(0, 100, 50);
    track1.slider.position(track1.sliderPosition.x, track1.sliderPosition.y);
    
    // Create volume slider for track 2
    track2.slider = createSlider(0, 100, 50);
    track2.slider.position(track2.sliderPosition.x, track2.sliderPosition.y);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}

function draw() {
    // Draw background image if loaded, otherwise white background
    if (bgImage) {
        image(bgImage, 0, 0, width, height);
    } else {
        background(255);
    }
    
    // Draw grid: 6x6 cells, each cell is 1/6 width x 1/6 height
    drawGrid();
    
    // Draw title - center of row 0
    fill(0);
    textAlign(CENTER);
    textSize(min(width, height) * 0.04);
    text("DJ Mixing Deck", width / 2, gridY(1) / 2);
    
    // Draw upload labels - aligned to grid
    fill(0);
    textAlign(CENTER);
    textSize(min(width, height) * 0.025);
    text("Upload Background:", gridX(1), gridY(1) / 2 - 10);
    text("Upload Track 1:", gridX(1), gridY(1) - 10);
    text("Upload Track 2:", gridX(4), gridY(1) - 10);
    
    // Draw volume labels - above sliders in row 3
    fill(0);
    textAlign(CENTER);
    textSize(min(width, height) * 0.025);
    text("Volume", track1.sliderPosition.x, track1.sliderPosition.y - 20);
    text("Volume", track2.sliderPosition.x, track2.sliderPosition.y - 20);
    
    // Update volume from sliders
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
    
    // Apply volume to playing sounds
    // Safety checks: prevent errors if sounds aren't loaded yet (not needed for basic workshop)
    // if (track1.sound && track1.sound.isPlaying()) {
    //     track1.sound.setVolume(track1.volume);
    // }
    // if (track2.sound && track2.sound.isPlaying()) {
    //     track2.sound.setVolume(track2.volume);
    // }
    if (track1.sound.isPlaying()) {
        track1.sound.setVolume(track1.volume);
    }
    if (track2.sound.isPlaying()) {
        track2.sound.setVolume(track2.volume);
    }
}

function toggleTrack(track) {
    // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
    // if (!track.sound) {
    //     return;
    // }
    
    // If playing, pause it
    if (track.sound.isPlaying()) {
        track.sound.pause();
        track.isPlaying = false;
    } 
    // If not playing, play it
    else {
        track.sound.setVolume(track.volume);
        track.sound.setLoop(true);
        track.sound.play();
        track.isPlaying = true;
    }
}

function handleBackgroundImage(file) {
    if (file.type === 'image') {
        bgImage = loadImage(file.data);
    }
}

function handleSoundUpload(file, track) {
    if (file.type === 'audio') {
        // Stop current sound if playing
        // Safety check: prevents errors if sound isn't loaded yet (not needed for basic workshop)
        // if (track.sound && track.sound.isPlaying()) {
        if (track.sound.isPlaying()) {
            track.sound.stop();
            track.isPlaying = false;
        }
        // }
        
        // Load new sound
        track.sound = loadSound(file.data);
        track.sound.setVolume(track.volume);
    }
}
/*
* Draw the grid
This function draws the grid of 6x6 cells.
This is optional: just a visual aid to help you see where the grid cells are while you're positioning elements.
*/
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
