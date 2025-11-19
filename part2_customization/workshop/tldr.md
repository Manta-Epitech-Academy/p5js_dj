# Quick Reference: DJ Mixing Deck - Customization

A quick guide for adding file upload functionality to your DJ deck.

---

## Step 1: Understanding File Uploads

- File uploads let users select files from their computer
- Use `createFileInput()` to create upload buttons
- Files can be images or audio

---

## Step 2: Background Image Upload

### Step 2 (A): Create Variable
- Add `let bgImage = null;` at top of code

### Step 2 (B): Create File Input
- In `setup()`: `let bgFileInput = createFileInput(handleBackgroundImage);`
- Position: `bgFileInput.position(10, 10);`
- Restrict: `bgFileInput.attribute('accept', 'image/*');`

### Step 2 (C): Create Handler
- Function: `handleBackgroundImage(file)`
- Check: `if (file.type === 'image')`
- Load: `bgImage = loadImage(file.data);`

### Step 2 (D): Display Image
- In `draw()`: `if (bgImage) { image(bgImage, 0, 0, width, height); } else { background(255); }`

---

## Step 3: Sound Upload for Track 1

### Step 3 (A): Add Property
- In track objects: `fileInput: null`

### Step 3 (B): Create File Input
- In `setup()`: `track1.fileInput = createFileInput(function(file) { handleSoundUpload(file, track1); });`
- Position: `track1.fileInput.position(10, 50);`
- Restrict: `track1.fileInput.attribute('accept', 'audio/*');`

### Step 3 (C): Create Handler
- Function: `handleSoundUpload(file, track)`
- Check: `if (file.type === 'audio')`
- Stop old: `if (track.sound && track.sound.isPlaying()) { track.sound.stop(); ... }`
- Load new: `track.sound = loadSound(file.data);`
- Set volume: `track.sound.setVolume(track.volume);`

---

## Step 4: Sound Upload for Track 2

- Same as Step 3, but for `track2`
- Position: `track2.fileInput.position(10, 90);`
- Uses same `handleSoundUpload()` function

---

## Step 5: Improve User Experience

### Add Labels
- In `draw()`: `text("Upload Background:", 10, 35);`
- `text("Upload Track 1:", 10, 75);`
- `text("Upload Track 2:", 10, 115);`

### Handle Edge Cases
- In `toggleTrack()`: Check `if (!track.sound) { return; }`
- In `draw()`: Check `if (track1.sound && track1.sound.isPlaying())`

---

## Key Functions

- `createFileInput(callback)` - creates file upload button
- `loadImage(file.data)` - loads image from file
- `loadSound(file.data)` - loads sound from file
- `file.type` - checks file type ('image' or 'audio')
- `file.data` - contains file data to load

---

## Step 1.5: Grid Helper Functions

### Create Grid Functions
- `gridX(cellX)` - Returns X position for column (0-5)
- `gridY(cellY)` - Returns Y position for row (0-5)
- Formula: `cellX * width / 6` for X, `cellY * height / 6` for Y
- Use these functions for all UI element positioning!

---

## Step 7: Sharing

### Share on p5.js
- Click "Share" button in editor
- Copy the link
- Send to friends

### Share with Friends
- Send link to friend
- Ask them to customize it
- Share it back!

---

## Testing Checklist

- ✅ Upload background image - does it display?
- ✅ Upload Track 1 sound - does it work?
- ✅ Upload Track 2 sound - does it work?
- ✅ Play both tracks - do they mix?
- ✅ Click play before upload - handled gracefully?
- ✅ Grid functions work correctly?

---

## Troubleshooting

- **Image doesn't display**: Check `draw()` has `if (bgImage) { image(...) }`
- **Sound doesn't play**: Check `loadSound(file.data)` and volume setting
- **Wrong position**: Adjust `position()` values
- **Wrong file types**: Check `attribute('accept', ...)`
- **Crashes**: Add checks for `if (track.sound)` before using

