// DJ Mixing Deck - Simple DJ Interface

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
    buttonLabel: "Track 1"
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
    buttonLabel: "Track 2"
};

function preload() {
    // Load the sound files
    track1.sound = loadSound('assets/sound1.mp3');
    track2.sound = loadSound('assets/sound2.mp3');
}

function setup() {
    createCanvas(800, 600);
    
    // Align positions to grid cells (6x6 grid)
    updatePositions();
    
    // Create play button for track 1
    track1.button = createButton("▶⏸");
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    track1.button.mousePressed(function() {
        toggleTrack(track1);
    });
    
    // Create play button for track 2
    track2.button = createButton("▶⏸");
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    track2.button.mousePressed(function() {
        toggleTrack(track2);
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

function updatePositions() {
    // Align to grid cells: columns are width/6, 2*width/6, 3*width/6, 4*width/6, 5*width/6
    // Row 1 (1*height/6): buttons (shifted 1 cell up)
    // Row 3 (3*height/6): sliders (shifted 2 cells up)
    
    // Track 1: column 1 (width/6)
    track1.buttonPosition.x = width / 6;
    track1.buttonPosition.y = 1 * height / 6;
    track1.sliderPosition.x = width / 6;
    track1.sliderPosition.y = 3 * height / 6;
    
    // Track 2: column 4 (4*width/6)
    track2.buttonPosition.x = 4 * width / 6;
    track2.buttonPosition.y = 1 * height / 6;
    track2.sliderPosition.x = 4 * width / 6;
    track2.sliderPosition.y = 3 * height / 6;
}

function draw() {
    background(255);
    
    // Draw grid: 6x6 cells, each cell is 1/6 width x 1/6 height
    drawGrid();
    
    // Draw title - center of top row (row 0)
    fill(0);
    textAlign(CENTER);
    text("DJ Mixing Deck", width/2, height / 12);
    
    // Draw volume labels - above sliders in row 3
    fill(0);
    textAlign(CENTER);
    text("Volume", width / 6, 3 * height / 6 - 20);
    text("Volume", 4 * width / 6, 3 * height / 6 - 20);
    
    // Update volume from sliders
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
    
    // Apply volume to playing sounds
    if (track1.sound.isPlaying()) {
        track1.sound.setVolume(track1.volume);
    }
    if (track2.sound.isPlaying()) {
        track2.sound.setVolume(track2.volume);
    }
  
}

function toggleTrack(track) {
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

function drawGrid() {
    stroke(200); // Light gray color for grid lines
    strokeWeight(1);
    
    // Draw vertical lines (6 columns)
    for (let i = 1; i < 6; i++) {
        let x = width * i / 6;
        line(x, 0, x, height);
    }
    
    // Draw horizontal lines (6 rows)
    for (let i = 1; i < 6; i++) {
        let y = height * i / 6;
        line(0, y, width, y);
    }
}
