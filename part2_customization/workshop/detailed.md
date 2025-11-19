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

## Step 1: Setting Up the Grid System

### Understanding the Grid System

To make positioning easier, we'll choose to split the canvas into a 6x6 grid. This means we'll divide the screen into 6 columns and 6 rows, making it easy to position UI elements precisely.

**The Concept**: Instead of manually calculating pixel positions like `width / 6` or `2 * height / 6`, you can create helper functions that convert grid cell coordinates (like column 1, row 2) directly into pixel coordinates.

**Why?** This makes positioning much easier! Instead of writing `width / 6` every time, you can just write `gridX(1)` for column 1, or `gridY(2)` for row 2.

### Step 1A: Use Full Window Size for Canvas

**What you need to do**: Update your `createCanvas()` call in `setup()` to use the full browser window size instead of a fixed size.

Find where you have `createCanvas(800, 600)` and change it to use `windowWidth` and `windowHeight` instead. Replace the fixed numbers `800` and `600` with `windowWidth` and `windowHeight`.

**Why use `windowWidth` and `windowHeight`?** 

Using `windowWidth` and `windowHeight` makes your DJ deck automatically fill the entire browser window, adapting to any screen size. This means:
- Your DJ deck will work well on different screen sizes (desktop, tablet, mobile)
- It automatically uses the full available space
- Users don't have to resize their browser or see empty space around your canvas
- It provides a better, more professional user experience

**Documentation**:
- [`windowWidth`](https://p5js.org/reference/p5/windowWidth/) - stores the width of the browser's viewport
- [`windowHeight`](https://p5js.org/reference/p5/windowHeight/) - stores the height of the browser's viewport

**Important**: Since your canvas will now adapt to the window size, all your UI elements will automatically scale with the grid system you're about to create!

### Step 1B: Create Grid Helper Functions

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

**How to implement it**:
- Create a function called `gridX` that takes one parameter (the column number) and returns the X pixel position by multiplying the column number by `width / 6`
- Create a function called `gridY` that takes one parameter (the row number) and returns the Y pixel position by multiplying the row number by `height / 6`

**Use this throughout the workshop!** Whenever you need to position UI elements, use `gridX()` and `gridY()` instead of manually calculating positions. For example:
- Instead of calculating `width / 6` manually, call `gridX(1)`
- Instead of calculating `2 * height / 6` manually, call `gridY(2)`

### Step 1C: Add a Grid Visual (Optional)

**What you need to do**: Create a `drawGrid()` function that draws the grid lines on the canvas. This helps you see where the grid cells are while you're positioning elements.

**The Logic**:
- Draw vertical lines at `width / 6`, `2 * width / 6`, `3 * width / 6`, `4 * width / 6`, `5 * width / 6`
- Draw horizontal lines at `height / 6`, `2 * height / 6`, `3 * height / 6`, `4 * height / 6`, `5 * height / 6`
- Use a light gray color so it's visible but not distracting

**Tip**: You can use your `gridX()` and `gridY()` functions here! Loop from 1 to 5 and draw lines at `gridX(i)` and `gridY(i)`.

Call `drawGrid()` in your `draw()` function to see the grid.

### Step 1D: Reposition Existing UI Elements Using the Grid

**What you need to do**: Update your existing UI elements from Part 1 to use the grid system.

From Part 1, you have:
- Track 1 button and slider
- Track 2 button and slider

**Reposition them using your grid helper functions**:
- Track 1 button: Column 1, Row 2 (use `gridX(1)`, `gridY(2)`)
- Track 1 slider: Column 1, Row 3 (use `gridX(1)`, `gridY(3)`)
- Track 2 button: Column 4, Row 2 (use `gridX(4)`, `gridY(2)`)
- Track 2 slider: Column 4, Row 3 (use `gridX(4)`, `gridY(3)`)
- Title: Center (use `width / 2`, `gridY(0)`)
- Volume labels: Above sliders (use `gridX(1)`, `gridY(3) - 20` and `gridX(4)`, `gridY(3) - 20`)

**Update your position calculations** (or wherever you set positions) to use `gridX()` and `gridY()` instead of manually calculating `width / 6` or `height / 6`.

**Important**: Use the grid system for all UI positioning from now on! This will make it much easier to add new elements later.

**Test it!** Make sure all your existing buttons and sliders are still working and properly positioned on the grid.

---

## Step 2: Understanding File Uploads

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

**Documentation**: [`createFileInput()`](https://p5js.org/reference/p5/createFileInput) creates a file upload button.

---

## Step 3: Adding Background Image Upload

### Step 3 (A): Creating a Variable for the Background Image

First, you need a place to store the uploaded image. At the top of your code (before the track objects), create a variable to store the background image.

Think about what value it should start with - we don't have an image yet, so what should the initial value be? Use `null` to represent "no image yet".

**Understanding**:
- You're creating a variable to store the image
- `null` means "no image yet" - we'll set it when a user uploads an image
- `null` is a special value that means "nothing" or "empty"

**Why `null`?** It's a way to say "we don't have an image yet, but we will later." This is useful for checking if an image has been uploaded.

### Step 3 (B): Creating the File Input Button

In your `setup()` function, after creating the canvas, create a file input button for images.

Think about:
1. What function should run when a file is selected? (This is the handler function)
2. Where should the button be positioned on screen? (Use your `gridX()` and `gridY()` functions!)
3. How can you restrict file selection to only images?

Create the file input button using `createFileInput()` and pass it the name of a handler function that will be called when a file is selected. Position it on the screen using the `position()` method with your grid helper functions. Use the `attribute()` method to restrict file selection to images only by setting `'accept'` to `'image/*'`.

**Documentation**:
- [`createFileInput()`](https://p5js.org/reference/p5/createFileInput) creates a file upload button
- [`.position()`](https://p5js.org/reference/p5.Element/position) places elements on screen
- [`.attribute()`](https://p5js.org/reference/p5.Element/attribute) sets HTML attributes


**Test it!** You should see a "Choose File" button in the top left. Try clicking it - a file browser should open, but it won't do anything yet because we haven't created the handler function.

### Step 3 (C): Creating the Handler Function

When a user selects an image file, you need a function to handle it. Create a function that handles when a user selects an image file.

Think about:
1. What information will this function receive about the selected file?
2. How can you check if the file is actually an image (not some other type)?
3. If it is an image, how do you load it and store it in your variable?

The function will be called automatically by p5.js when a file is selected. It receives a file object that contains information about the selected file, including the file data that you can use to load the image. Check `file.type` to see if it's an image, and if so, use `loadImage()` to load the image from `file.data` and store it in your `bgImage` variable.

**Documentation**: [`loadImage()`](https://p5js.org/reference/p5/loadImage) loads image files.

**Why check file type?** Users might accidentally select the wrong type of file. This check prevents errors.


**Test it!** Try uploading an image - the file should be selected, but you won't see it yet (we'll add that next).

### Step 3 (D): Displaying the Background Image

Now you need to display the uploaded image as the background. In your `draw()` function, at the very beginning, you need to decide what to draw as the background.

Think about:
1. How can you check if an image has been uploaded?
2. If an image exists, how do you draw it to fill the entire canvas?
3. If no image exists yet, what should the background be?

This is a conditional check - if we have an image, use it; otherwise, use the default white background. This happens every frame in `draw()`, so the background will update immediately when an image is uploaded. Use the `image()` function to draw the image, and position it at `(0, 0)` with size `width` and `height` to fill the entire canvas.

**Documentation**: [`image()`](https://p5js.org/reference/p5/image) draws images.


**Test it!** Upload an image - it should now appear as the background, filling the entire canvas!

---

## Step 4: Adding Sound Upload for Track 1

### Step 4 (A): Adding File Input Property to Track Objects

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

### Step 4 (B): Creating the File Input Button for Track 1

In your `setup()` function, after creating the background image file input, create a file input button for track 1.

Think about:
1. What function should run when a file is selected? (You'll need to pass both the file and which track it's for)
2. Where should this button be positioned? (Below the background upload button, using your grid helper functions)
3. How can you restrict file selection to only audio files?

This is similar to the background image upload, but this time you need to tell the handler function which track the sound is for. You can do this by passing the track object to the handler function. Create the file input using `createFileInput()` with a function that calls your sound upload handler, passing both the file and the track object. Position it below the background upload button using your grid helper functions, and restrict file selection to audio files only.

**Why pass the track object?** So the handler function knows which track to update. This lets us use the same handler for both tracks!


**Test it!** You should see a second "Choose File" button below the first one. It won't work yet because we haven't created the handler function.

### Step 4 (C): Creating the Sound Upload Handler

Create a function that handles when a user selects an audio file. Think about:
1. What information does this function need? (The file, and which track it's for)
2. How can you check if the file is actually an audio file?
3. If there's already a sound playing, what should happen to it?
4. How do you load the new sound and make it ready to play?

This function needs to handle replacing an existing sound. If a sound is currently playing, you should stop it first. Then load the new sound and set it up with the correct volume so it's ready to play. Check `file.type` to see if it's an audio file, and if so, stop any currently playing sound on that track, load the new sound from `file.data` using `loadSound()`, and set its volume using `setVolume()`.

**Documentation**: [`loadSound()`](https://p5js.org/reference/p5.sound/p5.SoundFile) loads sound files.

**Why stop the current sound?** If a sound is playing when a new one is uploaded, we should stop it first. Otherwise, both sounds might play at once, or the old sound might continue playing.

**Visual Concept**: ![Diagram showing sound upload flow - file selection → stop old sound → load new sound](img/custom_sound_file_upload.svg)

**Test it!** Upload an audio file for track 1 - it should replace the default sound! Try playing it to make sure it works.

---

## Step 5: Adding Sound Upload for Track 2

### Repeating the Process

Track 2 needs the same functionality. In your `setup()` function, after creating track 1's file input, create a similar file input for track 2.

Think about:
1. How can you reuse the same handler function for track 2?
2. Where should this button be positioned? (Below track 1's upload button, using your grid helper functions)
3. What's different from track 1's setup? (Just the track object and position)

Create a file input for track 2 using the same approach as track 1. Pass `track2` to the handler function instead of `track1`, and position it below track 1's file input using your grid helper functions. Use the same `handleSoundUpload()` function - that's code reuse!

**Why the same handler?** Because we pass the track object as a parameter, the same function works for both tracks. This is more efficient than writing the same code twice.


**Test it!** Upload audio files for both tracks - they should both work independently!

---

## Step 6: Improving User Experience

### Adding Labels

Users need to know what each file input button does. In your `draw()` function, add text labels above each file input button.

Think about:
1. What text should each label say?
2. Where should each label be positioned? (Just above its corresponding button, using your grid helper functions)
3. How should the text be aligned?

Labels help users understand what each button does. Position them just above each file input button so it's clear which label goes with which button. Use `fill()` to set the text color, `textAlign()` to align the text, and `text()` to draw each label at the appropriate position using your grid helper functions.


**Test it!** The labels should make it clear what each button does!

### Handling Edge Cases

Make sure your code handles situations where things might go wrong. Update your `toggleTrack()` function to check if the sound exists before trying to play it.

Think about:
1. What happens if a user clicks play before uploading a sound?
2. How can you check if a sound exists before trying to use it?

Before using something (like a sound), check if it exists first. This prevents errors and makes your program more robust. This is called "defensive programming" - checking for potential problems before they cause crashes.

Also update your `draw()` function to check if sounds exist before trying to use them. When applying volume changes, first check if the sound exists and if it's playing, then apply the volume. This prevents errors if a sound hasn't been uploaded yet.

**Understanding**:
- Check if the sound exists AND is playing before trying to use it
- The `&&` operator means "both conditions must be true"
- This prevents errors if a sound hasn't been uploaded yet

**Why handle edge cases?** Users might do unexpected things (like clicking play before uploading a sound). Your program should handle these gracefully instead of crashing.

**Test it!** Try clicking play buttons before uploading sounds - the program should handle it gracefully without errors!

---

## Step 7: Putting It All Together

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

## Step 8: Sharing Your DJ Deck

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

