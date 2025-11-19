# Quick Reference: DJ Mixing Deck - Customization

A quick guide for adding file upload functionality to your DJ deck.

---

## Step 1: Setting Up the Grid System

### Step 1A: Use Full Window Size for Canvas
- Change `createCanvas(800, 600)` to `createCanvas(windowWidth, windowHeight)`
- Uses full browser window size
- Automatically adapts to screen size

### Step 1B: Create Grid Helper Functions
- `gridX(cellX)` - Returns X position for column (0-5): `cellX * width / 6`
- `gridY(cellY)` - Returns Y position for row (0-5): `cellY * height / 6`
- Use these functions for all UI element positioning!

### Step 1C: Add a Grid Visual (Optional)
- Create `drawGrid()` function
- Draw vertical lines at `gridX(1)` through `gridX(5)`
- Draw horizontal lines at `gridY(1)` through `gridY(5)`
- Use light gray color
- Call `drawGrid()` in `draw()`

### Step 1D: Reposition Existing UI Elements Using the Grid
- Track 1 button: `gridX(1)`, `gridY(2)`
- Track 1 slider: `gridX(1)`, `gridY(3)`
- Track 2 button: `gridX(4)`, `gridY(2)`
- Track 2 slider: `gridX(4)`, `gridY(3)`
- Title: `width / 2`, `gridY(0)`
- Volume labels: Above sliders using grid positions

---

## Step 2: Understanding File Uploads

### What Are File Uploads?
- File uploads let users select files from their computer
- Use `createFileInput()` to create upload buttons
- Files can be images or audio
- Process: Create button → User selects file → Handle file → Use in program

---

## Step 3: Adding Background Image Upload

### Step 3A: Creating a Variable for the Background Image
- Add `let bgImage = null;` at top of code
- `null` means "no image yet"

### Step 3B: Creating the File Input Button
- In `setup()`: `let bgFileInput = createFileInput(handleBackgroundImage);`
- Position using `gridX()` and `gridY()` functions
- Restrict: `bgFileInput.attribute('accept', 'image/*');`

### Step 3C: Creating the Handler Function
- Function: `handleBackgroundImage(file)`
- Check: `if (file.type === 'image')`
- Load: `bgImage = loadImage(file.data);`

### Step 3D: Displaying the Background Image
- In `draw()`: `if (bgImage) { image(bgImage, 0, 0, width, height); } else { background(255); }`

---

## Step 4: Adding Sound Upload for Track 1

### Step 4A: Adding File Input Property to Track Objects
- In both track objects: `fileInput: null`

### Step 4B: Creating the File Input Button for Track 1
- In `setup()`: `track1.fileInput = createFileInput(function(file) { handleSoundUpload(file, track1); });`
- Position using `gridX()` and `gridY()` functions
- Restrict: `track1.fileInput.attribute('accept', 'audio/*');`

### Step 4C: Creating the Sound Upload Handler
- Function: `handleSoundUpload(file, track)`
- Check: `if (file.type === 'audio')`
- Stop old: `if (track.sound && track.sound.isPlaying()) { track.sound.stop(); track.isPlaying = false; }`
- Load new: `track.sound = loadSound(file.data);`
- Set volume: `track.sound.setVolume(track.volume);`

---

## Step 5: Adding Sound Upload for Track 2

- Same as Step 4, but for `track2`
- Pass `track2` to handler instead of `track1`
- Position using `gridX()` and `gridY()` functions
- Uses same `handleSoundUpload()` function

---

## Step 6: Improving User Experience

### Adding Labels
- In `draw()`: Add text labels above each file input button
- Use `gridX()` and `gridY()` for positioning
- Labels: "Upload Background:", "Upload Track 1:", "Upload Track 2:"

### Handling Edge Cases
- In `toggleTrack()`: Check `if (!track.sound) { return; }`
- In `draw()`: Check `if (track1.sound && track1.sound.isPlaying())` before using
- Prevents errors if user clicks play before uploading

---

## Step 7: Putting It All Together

### Final Testing Checklist
- ✅ Upload background image - does it display?
- ✅ Upload Track 1 sound - does it replace default?
- ✅ Upload Track 2 sound - does it replace default?
- ✅ Play both tracks - do they work?
- ✅ Mix tracks - can you play both at once?
- ✅ Click play before upload - handled gracefully?
- ✅ Grid functions work correctly?
- ✅ UI elements properly positioned on grid?

---

## Step 8: Sharing Your DJ Deck

### Share on p5.js Web Editor
- Click "Share" button in editor
- Copy the link
- Send to friends

### Share with Friends
- Send link to friend
- Ask them to customize it
- Share it back!

---

## Key Functions

- `createFileInput(callback)` - creates file upload button
- `loadImage(file.data)` - loads image from file
- `loadSound(file.data)` - loads sound from file
- `file.type` - checks file type ('image' or 'audio')
- `file.data` - contains file data to load
- `createCanvas(windowWidth, windowHeight)` - uses full window size
- `gridX(cellX)` - returns X position for column
- `gridY(cellY)` - returns Y position for row

---

## Troubleshooting

- **Image doesn't display**: Check `draw()` has `if (bgImage) { image(...) }`
- **Sound doesn't play**: Check `loadSound(file.data)` and volume setting
- **Wrong position**: Use `gridX()` and `gridY()` functions
- **Wrong file types**: Check `attribute('accept', ...)`
- **Crashes**: Add checks for `if (track.sound)` before using
- **Grid not working**: Make sure to use `gridX()` and `gridY()` for all positions
