# DJ Mixing Deck - Implementation Guide

## Overview
This guide outlines the step-by-step plan for building a DJ mixing deck with two tracks, play/pause buttons, and volume sliders.

---

## Step 1: Create Track Objects

### Step 1 (A): Create track1 Object
- Create `track1` object with properties:
  - `sound`: null
  - `volume`: 0.5
  - `isPlaying`: false
  - `slider`: null
  - `button`: object with x, y, width, height, label

### Step 1 (B): Create track2 Object
- Create `track2` object with same structure
- Position button at different x coordinate

---

## Step 2: Load Sounds

### Step 2 (A): Load Sounds in preload()
- Load `'assets/sound1.mp3'` into `track1.sound`
- Load `'assets/sound2.mp3'` into `track2.sound`

### Step 2 (B): Set Initial Volume in setup()
- Set `track1.sound.setVolume(track1.volume)`
- Set `track2.sound.setVolume(track2.volume)`

---

## Step 3: Create Buttons

### Step 3 (A): Create Buttons in setup()
- Create `track1.button = createButton("▶⏸")`
- Position it: `track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y)`
- Connect it: `track1.button.mousePressed(function() { toggleTrack(track1); })`
- Do the same for track2

---

## Step 4: Create Volume Sliders

### Step 4 (A): Create Sliders in setup()
- Create `track1.slider = createSlider(0, 100, 50)`
- Position it: `track1.slider.position(100, 350)`
- Do the same for track2 at position (550, 350)

### Step 4 (B): Draw Volume Labels in draw()
- Draw "Volume" text above each slider

---

## Step 5: Play/Pause Functionality

### Step 5 (A): Create toggleTrack() Function
- Takes track object as parameter
- If playing: pause and set `isPlaying = false`
- If not playing: set volume, set loop, play, set `isPlaying = true`

### Step 5 (B): Connect Buttons in setup()
- When creating buttons, use `.mousePressed()` to connect them
- `track1.button.mousePressed(function() { toggleTrack(track1); })`
- Do the same for track2

---

## Step 6: Volume Control

### Step 6 (A): Read Slider Values in draw()
- Update `track1.volume = track1.slider.value() / 100`
- Update `track2.volume = track2.slider.value() / 100`

### Step 6 (B): Apply Volume to Playing Sounds in draw()
- If `track1.sound.isPlaying()`, set `track1.sound.setVolume(track1.volume)`
- Do the same for track2

---

## Implementation Order

1. **First**: Complete Step 1 (Create track objects)
2. **Second**: Complete Step 2 (Load sounds)
3. **Third**: Complete Step 3 (Create buttons)
4. **Fourth**: Complete Step 4 (Create sliders)
5. **Fifth**: Complete Step 5 (Play/pause functionality)
6. **Sixth**: Complete Step 6 (Volume control)
7. **Seventh**: Complete Step 7 (Grid system and responsive design)
8. **Eighth**: Complete Step 8 (Background image upload)
9. **Ninth**: Complete Step 9 (Sound file upload)
10. **Tenth**: Complete Step 10 (Touch support)
11. **Eleventh**: Complete Step 11 (Labels and UX)

Each step builds upon the previous one, so follow them in order.

---

## Step 7: Setting Up the Grid System and Responsive Design

### Step 7A: Use Full Window Size for Canvas
- Change `createCanvas(800, 600)` to `createCanvas(windowWidth, windowHeight)`
- Uses full browser window size
- Automatically adapts to screen size
- Enables mobile publishing

### Step 7B: Create Grid Helper Functions
- `gridX(cellX)` - Returns X position for column (0-5): `cellX * width / 6`
- `gridY(cellY)` - Returns Y position for row (0-5): `cellY * height / 6`
- Use these functions for all UI element positioning!

### Step 7C: Update Grid Visual
- Update `drawGrid()` function to use `gridX()` and `gridY()`
- Loop from 1 to 5 and draw lines at `gridX(i)` and `gridY(i)`
- Use light gray color
- Call `drawGrid()` in `draw()`

### Step 7D: Reposition Existing UI Elements Using the Grid
- Track 1 button: `gridX(1)`, `gridY(2)`
- Track 1 slider: `gridX(1)`, `gridY(3)`
- Track 2 button: `gridX(4)`, `gridY(2)`
- Track 2 slider: `gridX(4)`, `gridY(3)`
- Title: `width / 2`, `gridY(1) / 2`
- Volume labels: Above sliders using grid positions

---

## Step 8: Adding File Upload for Background Images

### Step 8A: Creating a Variable for the Background Image
- Add `let bgImage = null;` at top of code
- `null` means "no image yet"

### Step 8B: Creating the File Input Button
- In `setup()`: `let bgFileInput = createFileInput(handleBackgroundImage);`
- Position using `gridX()` and `gridY()` functions
- Restrict: `bgFileInput.attribute('accept', 'image/*');`

### Step 8C: Creating the Handler Function
- Function: `handleBackgroundImage(file)`
- Check: `if (file.type === 'image')`
- Load: `bgImage = loadImage(file.data);`

### Step 8D: Displaying the Background Image
- In `draw()`: `if (bgImage) { image(bgImage, 0, 0, width, height); } else { background(255); }`

---

## Step 9: Adding File Upload for Track Sounds

### Step 9A: Adding File Input Property to Track Objects
- In both track objects: `fileInput: null`

### Step 9B: Creating the File Input Buttons
- In `setup()`: `track1.fileInput = createFileInput(function(file) { handleSoundUpload(file, track1); });`
- Position using `gridX()` and `gridY()` functions
- Restrict: `track1.fileInput.attribute('accept', 'audio/*');`
- Repeat for track2

### Step 9C: Creating the Sound Upload Handler
- Function: `handleSoundUpload(file, track)`
- Check: `if (file.type === 'audio')`
- Stop old: `if (track.sound && track.sound.isPlaying()) { track.sound.stop(); track.isPlaying = false; }`
- Load new: `track.sound = loadSound(file.data);`
- Set volume: `track.sound.setVolume(track.volume);`

---

## Step 10: Adding Touch Support for Mobile

### Step 10A: Adding Touch Support Variables
- Add at top: `let touchUsed = false;` and `let touchTimeout = null;`

### Step 10B: Updating Button Touch Handlers
- For each button: Add `.touchStarted()` handler
- Set `touchUsed = true` to prevent mouse events
- Call toggle function
- Clear flag after delay with `setTimeout()`
- Prevent default mouse event

---

## Step 11: Adding Labels and Improving User Experience

### Adding Labels
- In `draw()`: Add text labels above each file input button
- Use `gridX()` and `gridY()` for positioning
- Use responsive text sizing: `textSize(min(width, height) * 0.025)`
- Labels: "Upload Background:", "Upload Track 1:", "Upload Track 2:"

### Handling Edge Cases
- In `toggleTrack()`: Check `if (!track.sound) { return; }`
- In `draw()`: Check `if (track1.sound && track1.sound.isPlaying())` before using
- Prevents errors if user clicks play before uploading

---

## Key Functions (Updated)

- `createCanvas(windowWidth, windowHeight)` - uses full window size
- `gridX(cellX)` - returns X position for column
- `gridY(cellY)` - returns Y position for row
- `createFileInput(callback)` - creates file upload button
- `loadImage(file.data)` - loads image from file
- `loadSound(file.data)` - loads sound from file
- `file.type` - checks file type ('image' or 'audio')
- `file.data` - contains file data to load
- `.touchStarted()` - handles touch events on buttons
- `textSize(min(width, height) * 0.025)` - responsive text sizing

---

## Troubleshooting (Updated)

- **Image doesn't display**: Check `draw()` has `if (bgImage) { image(...) }`
- **Sound doesn't play**: Check `loadSound(file.data)` and volume setting
- **Wrong position**: Use `gridX()` and `gridY()` functions
- **Wrong file types**: Check `attribute('accept', ...)`
- **Crashes**: Add checks for `if (track.sound)` before using
- **Grid not working**: Make sure to use `gridX()` and `gridY()` for all positions
- **Touch double-triggering**: Check touch handlers and `touchUsed` flag
- **Responsive issues**: Verify `windowWidth` and `windowHeight` are used

