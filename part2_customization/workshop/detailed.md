# Step-by-Step Guide: Adding Customization to Your DJ Mixing Deck

This guide walks you through adding file upload functionality to your DJ mixing deck. You'll learn how to let users upload their own background images and sounds!

---

## Introduction: Understanding Customization

### What We're Adding

We're going to add customization features that let users:
- Upload their own background images
- Upload their own sounds for each track
- Personalize their DJ deck experience


### Key Concepts

**File Uploads**: File uploads let users select files from their computer and use them in your program. This is how websites let you upload photos, documents, or in our case, sounds and images.

**File Input Elements**: These are HTML elements that create a "Choose File" button. When clicked, they open a file browser so users can select files.

**File Handling**: Once a file is selected, you need to load it and use it in your program. Different file types (images vs. sounds) need different handling.

---

## Step 1: Understanding File Uploads

### What Are File Uploads?

File uploads are a way for users to select files from their computer and use them in your web application. In p5.js, you use `createFileInput()` to make this happen.

**How it works**:
1. You create a file input button
2. User clicks the button
3. A file browser opens
4. User selects a file
5. Your program receives information about the file
6. You can then load and use that file


### File Types

Different files have different types:
- **Images**: JPG, PNG, GIF, etc.
- **Audio**: MP3, WAV, OGG, etc.

You can restrict file inputs to only accept certain types using the `accept` attribute.

---

## Step 1.5: Creating Grid Helper Functions

### Understanding the Grid System

To make positioning easier, we'll choose to split the canvas into a 6x6 grid. This means we'll divide the screen into 6 columns and 6 rows, making it easy to position UI elements precisely.

**The Concept**: Instead of manually calculating pixel positions like `width / 6` or `2 * height / 6`, you can create helper functions that convert grid cell coordinates (like column 1, row 2) directly into pixel coordinates.

**Why?** This makes positioning much easier! Instead of writing `width / 6` every time, you can just write `gridX(1)` for column 1, or `gridY(2)` for row 2.

### Your Task: Create Grid Helper Functions

**What you need to do**: Create two helper functions that convert grid cell coordinates to pixel positions:

1. `gridX(cellX)` - Takes a column number (0-5) and returns the X pixel position
2. `gridY(cellY)` - Takes a row number (0-5) and returns the Y pixel position

**The Logic**:
- For a 6-column grid, column 0 starts at X position 0, column 1 is at `width / 6`, column 2 is at `2 * width / 6`, etc.
- For a 6-row grid, row 0 starts at Y position 0, row 1 is at `height / 6`, row 2 is at `2 * height / 6`, etc.

**Example**:
- `gridX(0)` returns `0` (left edge)
- `gridX(1)` returns `width / 6` (column 1)
- `gridX(3)` returns `3 * width / 6` (column 3)
- `gridY(0)` returns `0` (top edge)
- `gridY(1)` returns `height / 6` (row 1)
- `gridY(2)` returns `2 * height / 6` (row 2)

**Hint**: Use multiplication! `gridX(cellX)` should return `cellX * width / 6`.

**Code example**:
```javascript
function gridX(cellX) {
    return cellX * width / 6;
}

function gridY(cellY) {
    return cellY * height / 6;
}
```

**Use this throughout the workshop!** Whenever you need to position UI elements, use `gridX()` and `gridY()` instead of manually calculating positions. For example:
- Instead of `bgFileInput.position(width / 6 - 60, height / 12)`, you can use `bgFileInput.position(gridX(1) - 60, gridY(0) + gridY(0)/2)`
- Or more simply, position at the grid cell center: `bgFileInput.position(gridX(1), gridY(0))`

---

## Step 2: Adding Background Image Upload

### Step 2 (A): Creating a Variable for the Background Image

First, you need a place to store the uploaded image. At the top of your code (before the track objects), add:

```javascript
let bgImage = null;
```

**Understanding the code**:
- `let bgImage` creates a variable to store the image
- `= null` means "no image yet" - we'll set it when a user uploads an image
- `null` is a special value that means "nothing" or "empty"

**Why `null`?** It's a way to say "we don't have an image yet, but we will later." This is useful for checking if an image has been uploaded.

### Step 2 (B): Creating the File Input Button

In your `setup()` function, after creating the canvas, add:

```javascript
// Create file input for background image
let bgFileInput = createFileInput(handleBackgroundImage);
bgFileInput.position(10, 10);
bgFileInput.attribute('accept', 'image/*');
```

**Understanding the code**:
- [`createFileInput(handleBackgroundImage)`](https://p5js.org/reference/p5/createFileInput) creates a file upload button
  - `handleBackgroundImage` is the name of the function that will run when a file is selected
- [`position(10, 10)`](https://p5js.org/reference/p5.Element/position) places the button at coordinates (10, 10) - top left
- [`attribute('accept', 'image/*')`](https://p5js.org/reference/p5.Element/attribute) restricts file selection to images only
  - `'image/*'` means "any image type" (JPG, PNG, GIF, etc.)


**Test it!** You should see a "Choose File" button in the top left. Try clicking it - a file browser should open, but it won't do anything yet because we haven't created the handler function.

### Step 2 (C): Creating the Handler Function

When a user selects an image file, you need a function to handle it. Create this function:

```javascript
function handleBackgroundImage(file) {
    if (file.type === 'image') {
        bgImage = loadImage(file.data);
    }
}
```

**Understanding the code**:
- `function handleBackgroundImage(file)` - this function runs when a file is selected
  - `file` is an object containing information about the selected file
- `if (file.type === 'image')` - check if the file is an image
  - `file.type` tells you what kind of file it is
- `bgImage = loadImage(file.data)` - load the image from the file
  - [`loadImage()`](https://p5js.org/reference/p5/loadImage) loads an image file
  - `file.data` contains the file data that p5.js can use

**Why check file type?** Users might accidentally select the wrong type of file. This check prevents errors.


**Test it!** Try uploading an image - the file should be selected, but you won't see it yet (we'll add that next).

### Step 2 (D): Displaying the Background Image

Now you need to display the uploaded image as the background. In your `draw()` function, at the very beginning, replace `background(255);` with:

```javascript
// Draw background image if loaded, otherwise white background
if (bgImage) {
    image(bgImage, 0, 0, width, height);
} else {
    background(255);
}
```

**Understanding the code**:
- `if (bgImage)` - check if an image has been uploaded
  - If `bgImage` is not `null`, this condition is true
- `image(bgImage, 0, 0, width, height)` - draw the image
  - [`image()`](https://p5js.org/reference/p5/image) draws an image
  - `bgImage` is the image to draw
  - `0, 0` is the position (top left corner)
  - `width, height` makes it fill the entire canvas
- `else { background(255); }` - if no image, use white background
  - This is the default background


**Test it!** Upload an image - it should now appear as the background, filling the entire canvas!

---

## Step 3: Adding Sound Upload for Track 1

### Step 3 (A): Adding File Input Property to Track Objects

Each track needs to store its file input button. In both `track1` and `track2` objects, add:

```javascript
fileInput: null
```

So your track objects should look like:

```javascript
let track1 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    sliderPosition: {
        x: 150,
        y: 350
    },
    button: null,
    buttonPosition: {
        x: 150,
        y: 200
    },
    buttonLabel: "Track 1",
    fileInput: null  // Add this
};
```

**Understanding the code**:
- `fileInput: null` - we'll store the file input button here later
- Just like `slider: null` and `button: null`, this stores a UI element

### Step 3 (B): Creating the File Input Button for Track 1

In your `setup()` function, after creating the background image file input, add:

```javascript
// Create file input for track 1 sound
track1.fileInput = createFileInput(function(file) {
    handleSoundUpload(file, track1);
});
track1.fileInput.position(10, 50);
track1.fileInput.attribute('accept', 'audio/*');
```

**Understanding the code**:
- `track1.fileInput = createFileInput(...)` - create the file input and store it in the track object
- `function(file) { handleSoundUpload(file, track1); }` - when a file is selected:
  - This anonymous function runs
  - It calls `handleSoundUpload()` with the file and the track object
  - We pass `track1` so the function knows which track to update
- `position(10, 50)` - place it below the background upload button (50 pixels down)
- `attribute('accept', 'audio/*')` - restrict to audio files only

**Why pass the track object?** So the handler function knows which track to update. This lets us use the same handler for both tracks!


**Test it!** You should see a second "Choose File" button below the first one. It won't work yet because we haven't created the handler function.

### Step 3 (C): Creating the Sound Upload Handler

Create a function to handle sound uploads:

```javascript
function handleSoundUpload(file, track) {
    if (file.type === 'audio') {
        // Stop current sound if playing
        if (track.sound && track.sound.isPlaying()) {
            track.sound.stop();
            track.isPlaying = false;
        }
        
        // Load new sound
        track.sound = loadSound(file.data);
        track.sound.setVolume(track.volume);
    }
}
```

**Understanding the code**:
- `function handleSoundUpload(file, track)` - takes the file and track object
- `if (file.type === 'audio')` - check if it's an audio file
- `if (track.sound && track.sound.isPlaying())` - if there's a current sound and it's playing:
  - `track.sound.stop()` - stop the current sound
  - `track.isPlaying = false` - update the playing state
  - Note: Button label doesn't need to be updated (it always shows "▶⏸")
- `track.sound = loadSound(file.data)` - load the new sound
  - [`loadSound()`](https://p5js.org/reference/p5.sound/p5.SoundFile) loads sound files
  - `file.data` contains the file data
- `track.sound.setVolume(track.volume)` - set the volume so it's ready to play

**Why stop the current sound?** If a sound is playing when a new one is uploaded, we should stop it first. Otherwise, both sounds might play at once, or the old sound might continue playing.

**Visual Concept**: ![Diagram showing sound upload flow - file selection → stop old sound → load new sound](img/custom_sound_file_upload.svg)

**Test it!** Upload an audio file for track 1 - it should replace the default sound! Try playing it to make sure it works.

---

## Step 4: Adding Sound Upload for Track 2

### Repeating the Process

Track 2 needs the same functionality. In your `setup()` function, after creating track 1's file input, add:

```javascript
// Create file input for track 2 sound
track2.fileInput = createFileInput(function(file) {
    handleSoundUpload(file, track2);
});
track2.fileInput.position(10, 90);
track2.fileInput.attribute('accept', 'audio/*');
```

**Understanding the code**:
- Same as track 1, but for `track2`
- Position at `(10, 90)` - below track 1's file input
- Uses the same `handleSoundUpload()` function - that's code reuse!

**Why the same handler?** Because we pass the track object as a parameter, the same function works for both tracks. This is more efficient than writing the same code twice.


**Test it!** Upload audio files for both tracks - they should both work independently!

---

## Step 5: Improving User Experience

### Adding Labels

Users need to know what each file input button does. In your `draw()` function, add labels:

```javascript
// Draw upload labels
fill(0);
textAlign(LEFT);
text("Upload Background:", 10, 35);
text("Upload Track 1:", 10, 75);
text("Upload Track 2:", 10, 115);
```

**Understanding the code**:
- `fill(0)` - black text color
- `textAlign(LEFT)` - align text to the left
- `text("Upload Background:", 10, 35)` - draw label at position (10, 35)
  - Positioned just above the background file input button
- Same for track 1 and track 2 labels


**Test it!** The labels should make it clear what each button does!

### Handling Edge Cases

Make sure your code handles situations where things might go wrong. Update your `toggleTrack()` function:

```javascript
function toggleTrack(track) {
    // Check if sound is loaded
    if (!track.sound) {
        return;
    }
    
    // ... rest of the function
}
```

**Understanding the code**:
- `if (!track.sound)` - if there's no sound loaded
- `return;` - exit the function early (don't try to play)
- This prevents errors if a user clicks play before uploading a sound

Also update your `draw()` function to check if sounds exist:

```javascript
// Apply volume to playing sounds
if (track1.sound && track1.sound.isPlaying()) {
    track1.sound.setVolume(track1.volume);
}
if (track2.sound && track2.sound.isPlaying()) {
    track2.sound.setVolume(track2.volume);
}
```

**Understanding the code**:
- `if (track1.sound && ...)` - check if sound exists AND is playing
- The `&&` operator means "both conditions must be true"
- This prevents errors if a sound hasn't been uploaded yet

**Why handle edge cases?** Users might do unexpected things (like clicking play before uploading a sound). Your program should handle these gracefully instead of crashing.

**Test it!** Try clicking play buttons before uploading sounds - the program should handle it gracefully without errors!

---

## Step 6: Putting It All Together

### Final Testing Checklist

Test all the features:

1. ✅ **Background Image Upload**
   - Click "Choose File" for background
   - Select an image
   - Does it appear as the background?

2. ✅ **Track 1 Sound Upload**
   - Click "Choose File" for Track 1
   - Select an audio file
   - Does it replace the default sound?
   - Can you play it?

3. ✅ **Track 2 Sound Upload**
   - Click "Choose File" for Track 2
   - Select an audio file
   - Does it replace the default sound?
   - Can you play it?

4. ✅ **Mixing**
   - Upload sounds for both tracks
   - Play both tracks at once
   - Adjust volumes independently
   - Does everything work together?

5. ✅ **Edge Cases**
   - Try clicking play before uploading sounds
   - Try uploading wrong file types
   - Does the program handle these gracefully?

### Customization Ideas

Now that file uploads work, try:
- Upload different background images (photos, patterns, colors)
- Upload your favorite songs
- Mix different genres of music
- Create themed DJ decks:
  - Electronic music with neon backgrounds
  - Jazz with vintage photo backgrounds
  - Rock with concert photo backgrounds

---

## Troubleshooting

### Problem: Image doesn't display after upload

**Possible causes**:
- Image not being loaded correctly
- Image not being drawn in `draw()`

**Solutions**:
- Check that `handleBackgroundImage()` is calling `loadImage(file.data)`
- Check that `draw()` is checking `if (bgImage)` and calling `image()`
- Check the browser console for error messages

### Problem: Sound doesn't play after upload

**Possible causes**:
- Sound not being loaded correctly
- Sound not being set up properly

**Solutions**:
- Check that `handleSoundUpload()` is calling `loadSound(file.data)`
- Check that volume is being set: `track.sound.setVolume(track.volume)`
- Check the browser console for error messages
- Make sure you're using audio files (MP3, WAV, OGG)

### Problem: File input buttons are in the wrong place

**Solution**: Adjust the `position()` values:
- `position(10, 10)` - background image upload
- `position(10, 50)` - track 1 upload
- `position(10, 90)` - track 2 upload
- Increase the y values to move them down

### Problem: Wrong file types can be selected

**Solution**: Check that you're using `.attribute('accept', 'image/*')` for images and `'audio/*'` for audio files.

### Problem: Program crashes when clicking play before uploading

**Solution**: Make sure you're checking if sounds exist:
- In `toggleTrack()`: `if (!track.sound) { return; }`
- In `draw()`: `if (track1.sound && track1.sound.isPlaying())`

**Remember**: Always check the browser console (F12) for error messages. They'll tell you exactly what went wrong!

---

## Step 7: Sharing Your DJ Deck

### Sharing on p5.js Web Editor

Once your DJ deck is working, you can share it with others:

1. In the p5.js web editor, click the "Share" button (usually in the top right)
2. Copy the share link that appears
3. Send it to friends or post it online

**Why share?**
- Friends can use your DJ deck
- They can upload their own sounds and images
- You can get feedback and see how others use it
- Build a community around your project

### Sharing with Friends

**Your Task**: 
1. Share your p5.js sketch link with a friend
2. Ask them to:
   - Upload their own sounds and images
   - Create their own custom DJ deck
   - Share it back with you!

**Why share?**
- See how others customize your creation
- Get ideas for improvements
- Build a community around your project
- Have fun mixing music together!
- Learn from how others use your code

---

## Congratulations! 🎉

You've successfully added customization features to your DJ deck! Users can now upload their own background images and sounds, making each DJ deck unique and personal.

**What You Learned**:
- How file uploads work in web applications
- How to create file input buttons in p5.js
- How to handle image file uploads
- How to handle audio file uploads
- How to replace existing assets with user-uploaded files
- How to improve user experience with labels and error handling
- How to handle edge cases gracefully
- How to use a grid-based positioning system for UI layout
- How to create helper functions for cleaner code
- How to share your creation with others

**Next Steps**:
- Experiment with different file types
- Add more customization options (colors, fonts, etc.)
- **Share your p5.js sketch link with friends!**
- **Encourage friends to create their own custom DJ decks!**
- Try creating themed DJ decks with matching images and sounds

