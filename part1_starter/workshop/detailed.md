# Step-by-Step Guide: Creating a DJ Mixing Deck with p5.js

This guide walks you through creating a DJ mixing deck from scratch using p5.js. Each step builds upon the previous one, so follow the steps in order!

---

## Introduction: Understanding the Project

### What We're Building

A DJ mixing deck is a tool that lets you play multiple sounds simultaneously and control them independently. Our digital mixing deck will be an interactive web application that lets users:
- Play two different sounds at the same time
- Control each sound's volume independently
- Start and stop each sound with buttons
- Mix sounds together like a real DJ

**Real-world analogy**: Think of a professional DJ setup with two turntables. Each turntable can play a different record, and the DJ can control the volume of each one independently. Our digital version works similarly - two tracks, each with its own controls!

### Key Concepts

**Functions**: Functions are reusable blocks of code that perform a specific task. Think of them like recipes - you write the recipe once, then you can follow it (call the function) whenever you need it. In p5.js, `setup()` runs once when the program starts, and `draw()` runs continuously (60 times per second).

**Variables**: Variables are containers that store information. You give them a name (like `myName`) and assign a value to them (like `"Alice"`). Variables can store different types of data: text (strings), numbers, true/false values (booleans), and more.

**Objects**: Objects are collections of related data grouped together. Think of a contact card - it has a name, phone number, address, etc. In our mixing deck, each track is an object that contains everything related to that track: its sound, volume, play state, button, and slider.

**Properties**: Properties are pieces of information stored in an object. Like a person's height, weight, and name are properties of a person object. Our track objects have properties like `sound`, `volume`, and `isPlaying`.

**Object-Oriented Thinking**: Instead of having separate variables scattered around, we organize related data into objects. This makes code easier to understand and maintain.

### Explaining Concepts to Beginners

When teaching this workshop to absolute beginners, you may need to explain:

**Functions**: "A function is like a recipe. You write the steps once, then you can use that recipe (call the function) whenever you need it. `setup()` is a special recipe that runs once when your program starts. `draw()` is a recipe that runs over and over again."

**Variables**: "A variable is like a labeled box. You put a label on it (the variable name) and put something inside (the value). Later, you can change what's inside, but the label stays the same."

**Objects**: "An object is like a filing cabinet with multiple drawers. Each drawer has a label (property name) and contains something (property value). All the drawers belong to one filing cabinet (object)."

**Properties**: "A property is one drawer in the filing cabinet. It has a label (the property name) and contains something (the property value)."

---

## Step 1: Creating Track Objects

### Understanding Objects

An object is a way to group related information together. Instead of having separate variables like `sound1`, `volume1`, `isPlaying1`, `button1`, we put everything related to track 1 in one object called `track1`.

**Why use objects?**
- Keeps related data organized
- Makes code easier to understand
- Makes code easier to maintain
- Professional developers use this approach

### Step 1 (A): Creating Your First Track Object

We need to create an object that stores everything about track 1. Here's what a track needs:

```javascript
let track1 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    button: null,
    sliderPosition: {
        x: 150,
        y: 350
    },
    buttonPosition: {
        x: 150,
        y: 200
    },
    buttonLabel: "Track 1"
};
```

**Understanding the code**:
- `let track1 = { ... }` creates an object called `track1`
- `sound: null` - we'll load the sound file here later
- `volume: 0.5` - volume level (0.5 = 50%, which is half volume)
- `isPlaying: false` - whether the track is currently playing
- `slider: null` - we'll create the slider later
- `button: null` - we'll create the button later
- `sliderPosition: { x: 150, y: 350 }` - where the slider will be positioned
- `buttonPosition: { x: 150, y: 200 }` - where the button will be positioned
- `buttonLabel: "Track 1"` - text to display on button

**Why separate position objects?** It keeps the position organized in the track object, making it easy to change later. It's like having labeled drawers in a filing cabinet - each drawer (position) has a clear purpose.

### Step 1 (B): Creating Your Second Track Object

Now create a second track object with the same structure:

```javascript
let track2 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    button: null,
    sliderPosition: {
        x: 450,
        y: 350
    },
    buttonPosition: {
        x: 450,
        y: 200
    },
    buttonLabel: "Track 2"
};
```

**Positioning Logic**: 
- Track 1 button at x: 150
- Track 2 button at x: 450
- Same y position (200) so they're on the same row
- This places them side by side

**Visual Concept**: [SCHEMA PLACEHOLDER: Layout diagram showing two buttons side by side]

**Test it!** You won't see anything yet, but your objects are created. Check the console for any errors.

---

## Step 2: Loading Sounds

### Understanding Sound Loading

Sounds need to be loaded before you can play them. In p5.js, we use the `preload()` function to load sounds before the program starts.

**Why preload()?**
- It runs before `setup()`, ensuring sounds are ready
- It prevents errors from trying to play sounds that aren't loaded
- It's the standard way to load assets in p5.js


### Step 2 (A): Loading Sounds in preload()

The `preload()` function runs automatically before `setup()`. This is where we load our sound files:

```javascript
function preload() {
    track1.sound = loadSound('assets/sound1.mp3');
    track2.sound = loadSound('assets/sound2.mp3');
}
```

**Understanding the code**:
- [`loadSound('assets/sound1.mp3')`](https://p5js.org/reference/p5.sound/p5.SoundFile) loads the sound file
- `track1.sound = ...` stores the loaded sound in the track1 object
- The path `'assets/sound1.mp3'` means the file is in the `assets` folder

**File organization**: Put your sound files in an `assets` folder in your project. Common formats: WAV, MP3, OGG.

**Documentation**: [`loadSound()`](https://p5js.org/reference/p5.sound/p5.SoundFile) loads sound files. Note: You need to include the p5.sound library!

### Step 2 (B): Setting Initial Volume in setup()

After creating the canvas, set the initial volume for both tracks:

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}
```

**Understanding the code**:
- [`setVolume()`](https://p5js.org/reference/p5.sound/p5.SoundFile/setVolume) sets the volume of a sound
- `track1.volume` is 0.5 (50%), so the sound starts at half volume
- We do this so sounds are ready to play at the correct volume

**Test it!** The sounds should load without errors. Check the console if something goes wrong.

---

## Step 3: Creating Buttons

### Understanding Buttons

Buttons are interactive elements that respond to clicks. In p5.js, you can create buttons using `createButton()`, which automatically handles click detection for you.

**What makes a button work?**
- Position: where it appears on screen
- Label: text that tells the user what it does
- Click handler: what happens when you click it

**Real-world example**: A light switch:
- Position: on the wall (specific location)
- Label: maybe "Kitchen Light" or "Living Room Light" written on it
- Action: turns lights on/off when pressed

### Step 3 (A): Creating Buttons with createButton()

In p5.js, you can create buttons using `createButton()`. This creates an HTML button element that automatically handles clicks. Add this to your `setup()` function:

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Create play button for track 1
    track1.button = createButton(track1.buttonLabel);
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    
    // Create play button for track 2
    track2.button = createButton(track2.buttonLabel);
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}
```

**Understanding the code**:
- [`createButton(track1.buttonLabel)`](https://p5js.org/reference/p5/createButton) creates a button with the label text
- `track1.button = ...` stores the button in the track1 object
- [`position(x, y)`](https://p5js.org/reference/p5.Element/position) places the button on screen
- `track1.buttonPosition.x` and `track1.buttonPosition.y` use the position from the track object

**Why use createButton()?** 
- It's simpler than drawing buttons manually
- It automatically handles click detection
- It creates a real HTML button that users can interact with

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing button creation and positioning]

**Documentation**: [`createButton()`](https://p5js.org/reference/p5/createButton) creates a button element.

**Test it!** You should see two buttons displayed on the screen!

---

## Step 4: Creating Volume Sliders

### Understanding Sliders

Sliders are controls that let users adjust a value by dragging. Each track needs its own slider to control its volume.

**What makes a slider work?**
- A range of values (minimum and maximum)
- A current value (where the slider is positioned)
- A position on screen (where it appears)

**Real-world example**: A volume knob on a stereo:
- Range: from silent (0) to maximum (100%)
- Current value: where the knob is turned
- Position: on the stereo control panel

### Step 4 (A): Creating Sliders in setup()

In p5.js, you create sliders using `createSlider()`. Add this to your `setup()` function after creating the buttons:

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Create play button for track 1
    track1.button = createButton(track1.buttonLabel);
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    
    // Create play button for track 2
    track2.button = createButton(track2.buttonLabel);
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    
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
```

**Understanding the code**:
- [`createSlider(0, 100, 50)`](https://p5js.org/reference/p5/createSlider) creates a slider
  - `0` = minimum value
  - `100` = maximum value
  - `50` = starting value (50%)
- `track1.slider = ...` stores the slider in the track1 object
- [`position(100, 350)`](https://p5js.org/reference/p5.Element/position) places the slider on screen
- Position track2's slider at (550, 350) to place it below track2's button

**Visual Concept**: [SCHEMA PLACEHOLDER: Layout diagram showing buttons and sliders positioned for each track]

**Documentation**: [`createSlider()`](https://p5js.org/reference/p5/createSlider) creates a slider element.

**Test it!** You should see two sliders on the screen that you can drag!

### Step 4 (B): Adding Volume Labels

Users need to know what the sliders control. Add labels in your `draw()` function:

```javascript
function draw() {
    background(255);
    
    // Draw title
    fill(0);
    textAlign(CENTER);
    text("DJ Mixing Deck", width/2, 50);
    
    // Draw buttons
    drawButton(track1.button);
    drawButton(track2.button);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    text("Volume", 175, 330);
    text("Volume", 625, 330);
}
```

**Understanding the code**:
- `text("Volume", 175, 330)` draws "Volume" above track1's slider
- `text("Volume", 625, 330)` draws "Volume" above track2's slider
- Position them centered above their respective sliders

**Test it!** You should see "Volume" labels above each slider!

---

## Step 5: Play/Pause Functionality

### Understanding Toggle Logic

A toggle switches between two states. For play/pause:
- If playing → pause it
- If not playing → play it

**Real-world analogy**: A light switch:
- If light is on → turn it off
- If light is off → turn it on

### Step 5 (A): Creating the toggleTrack() Function

Create a function that toggles a track's play state:

```javascript
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
```

**Understanding the code**:
- `function toggleTrack(track)` - takes a track object as input
- [`track.sound.isPlaying()`](https://p5js.org/reference/p5.sound/p5.SoundFile/isPlaying) checks if sound is playing
- If playing:
  - [`pause()`](https://p5js.org/reference/p5.sound/p5.SoundFile/pause) stops playback
  - `track.isPlaying = false` updates our state
- If not playing:
  - [`setVolume(track.volume)`](https://p5js.org/reference/p5.sound/p5.SoundFile/setVolume) sets volume
  - [`setLoop(true)`](https://p5js.org/reference/p5.sound/p5.SoundFile/setLoop) makes it loop
  - [`play()`](https://p5js.org/reference/p5.sound/p5.SoundFile/play) starts playback
  - `track.isPlaying = true` updates our state

**Documentation**: 
- [`.isPlaying()`](https://p5js.org/reference/p5.sound/p5.SoundFile/isPlaying) checks if sound is playing
- [`.pause()`](https://p5js.org/reference/p5.sound/p5.SoundFile/pause) pauses sound
- [`.play()`](https://p5js.org/reference/p5.sound/p5.SoundFile/play) plays sound
- [`.setLoop()`](https://p5js.org/reference/p5.sound/p5.SoundFile/setLoop) makes sound loop

### Step 5 (B): Connecting Buttons to Toggle Function

When you create buttons with `createButton()`, you connect them to functions using `.mousePressed()`. This automatically handles click detection for you. Update your `setup()` function:

```javascript
function setup() {
    createCanvas(800, 600);
    
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
    
    // ... (rest of setup code)
}
```

**Understanding the code**:
- [`createButton()`](https://p5js.org/reference/p5/createButton) creates the button
- [`position()`](https://p5js.org/reference/p5.Element/position) places it on screen
- [`.mousePressed(function() { ... })`](https://p5js.org/reference/p5.Element/mousePressed) connects a function to button clicks
- When the button is clicked, it automatically calls `toggleTrack(track1)` or `toggleTrack(track2)`

**Why this works?** The `.mousePressed()` method automatically detects when the button is clicked and calls your function. No need to check mouse coordinates manually!

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing button connection with mousePressed callback]

**Documentation**: [`.mousePressed()`](https://p5js.org/reference/p5.Element/mousePressed) connects a function to button clicks.

**Test it!** Click the buttons - sounds should play and pause!

---

## Step 6: Volume Control

### Understanding Real-Time Updates

Volume needs to update continuously as the user moves the slider. This happens in the `draw()` function, which runs many times per second.

**The Logic**: 
1. Read the slider's current value
2. Convert it to a volume (0.0 to 1.0)
3. Apply it to the sound if it's playing

### Step 6 (A): Reading Slider Values

Sliders return values from 0 to 100, but sounds need values from 0.0 to 1.0. Update your `draw()` function:

```javascript
function draw() {
    background(255);
    
    // Draw title
    fill(0);
    textAlign(CENTER);
    text("DJ Mixing Deck", width/2, 50);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    text("Volume", 210, 330);
    text("Volume", 510, 330);
    
    // Update volume from sliders
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
}
```

**Understanding the code**:
- [`track1.slider.value()`](https://p5js.org/reference/p5.Element/value) gets the slider's current value (0-100)
- Dividing by 100 converts it to 0.0-1.0 (so 50 becomes 0.5)
- `track1.volume = ...` stores the updated volume
- This runs every frame, so volume updates in real-time

**Why divide by 100?** Sliders use 0-100 (percentage), but sounds use 0.0-1.0 (decimal). Dividing converts between them.

### Step 6 (B): Applying Volume to Playing Sounds

Now apply the volume to sounds that are currently playing:

```javascript
function draw() {
    background(255);
    
    // ... (all the drawing code from before) ...
    
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
```

**Understanding the code**:
- Check if each track's sound is playing
- If playing, update its volume using `setVolume()`
- This happens every frame, so volume changes smoothly as you move the slider

**Why check if playing?** No need to update volume if the sound isn't playing.

**Test it!** Move the sliders while sounds are playing - the volume should change in real-time!

---

## Putting It All Together

### The Complete Flow

Your mixing deck should now work like this:

1. **preload()**: Load sound files into track objects
2. **setup()**: 
   - Create canvas
   - Create sliders
   - Set initial volume
3. **draw()** (runs continuously):
   - Draw title
   - Draw buttons
   - Draw volume labels
   - Update volume from sliders
   - Apply volume to playing sounds
4. **mousePressed()**: When button clicked, toggle that track

**Visual Concept**: [SCHEMA PLACEHOLDER: Flow diagram showing the complete program flow]

### Testing Your Mixing Deck

Test each feature:
- ✅ Click track1 button → sound1 plays
- ✅ Click track1 button again → sound1 pauses
- ✅ Click track2 button → sound2 plays
- ✅ Both tracks can play at the same time (mixing!)
- ✅ Move track1 slider → track1 volume changes
- ✅ Move track2 slider → track2 volume changes
- ✅ Sounds loop continuously

### Troubleshooting

**No sound?**
- Check that p5.sound library is included
- Check that sound files are in the `assets` folder
- Check browser console for errors

**Buttons don't work?**
- Check that click detection logic is correct
- Check button positions match your click detection
- Add `console.log()` to see if `mousePressed()` is being called

**Volume doesn't change?**
- Check that you're reading slider values in `draw()`
- Check that you're applying volume to playing sounds
- Check that volume conversion (divide by 100) is correct

---

## Customization Ideas

Now that your mixing deck works, try customizing it:

- **Change button positions and sizes**
- **Change slider positions**
- **Add a title or labels**
- **Change colors**
- **Add more tracks**
- **Add visual feedback when tracks are playing**

**Remember**: Experimentation is how you learn! Try things, see what happens, and learn from it.

---

## Congratulations!

You've built a functional DJ mixing deck! You've learned:
- How to organize code using objects
- How to load and play multiple sounds
- How to create interactive buttons
- How to create and use sliders
- How to control volume in real-time
- How to mix sounds together

These concepts will help you build even more complex interactive applications!

---

## Step 7: Setting Up the Grid System and Responsive Design

### Understanding the Grid System

To make positioning easier and support mobile devices, we'll split the canvas into a 6x6 grid. This means we'll divide the screen into 6 columns and 6 rows, making it easy to position UI elements precisely and ensuring they work on different screen sizes.

**The Concept**: Instead of manually calculating pixel positions like `width / 6` or `2 * height / 6`, you can create helper functions that convert grid cell coordinates (like column 1, row 2) directly into pixel coordinates.

**Why?** This makes positioning much easier! Instead of writing `width / 6` every time, you can just write `gridX(1)` for column 1, or `gridY(2)` for row 2. Plus, it makes your app work on mobile devices!

### Step 7 (A): Use Full Window Size for Canvas

**What you need to do**: Update your `createCanvas()` call in `setup()` to use the full browser window size instead of a fixed size.

Find where you have `createCanvas(800, 600)` and change it to use `windowWidth` and `windowHeight` instead. Replace the fixed numbers `800` and `600` with `windowWidth` and `windowHeight`.

**Why use `windowWidth` and `windowHeight`?** 

Using `windowWidth` and `windowHeight` makes your DJ deck automatically fill the entire browser window, adapting to any screen size. This means:
- Your DJ deck will work well on different screen sizes (desktop, tablet, mobile)
- It automatically uses the full available space
- Users don't have to resize their browser or see empty space around your canvas
- It provides a better, more professional user experience
- **You can publish it as a mobile application!**

**Documentation**:
- [`windowWidth`](https://p5js.org/reference/p5/windowWidth/) - stores the width of the browser's viewport
- [`windowHeight`](https://p5js.org/reference/p5/windowHeight/) - stores the height of the browser's viewport

**Important**: Since your canvas will now adapt to the window size, all your UI elements will automatically scale with the grid system you're about to create!

### Step 7 (B): Create Grid Helper Functions

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

**Use this throughout the workshop!** Whenever you need to position UI elements, use `gridX()` and `gridY()` instead of manually calculating positions.

### Step 7 (C): Update Grid Visual

**What you need to do**: Update your existing `drawGrid()` function to use the new `gridX()` and `gridY()` helper functions.

**The Logic**:
- Use your `gridX()` and `gridY()` functions in the grid drawing code
- Loop from 1 to 5 and draw lines at `gridX(i)` and `gridY(i)`

**Tip**: This makes your grid code cleaner and easier to understand!

### Step 7 (D): Reposition Existing UI Elements Using the Grid

**What you need to do**: Update your existing UI elements to use the grid system.

**Reposition them using your grid helper functions**:
- Track 1 button: Column 1, Row 2 (use `gridX(1)`, `gridY(2)`)
- Track 1 slider: Column 1, Row 3 (use `gridX(1)`, `gridY(3)`)
- Track 2 button: Column 4, Row 2 (use `gridX(4)`, `gridY(2)`)
- Track 2 slider: Column 4, Row 3 (use `gridX(4)`, `gridY(3)`)
- Title: Center (use `width / 2`, `gridY(1) / 2`)
- Volume labels: Above sliders (use `gridX(1)`, `gridY(3) - 20` and `gridX(4)`, `gridY(3) - 20`)

**Update your position calculations** to use `gridX()` and `gridY()` instead of manually calculating `width / 6` or `height / 6`.

**Important**: Use the grid system for all UI positioning from now on! This will make it much easier to add new elements later.

**Test it!** Make sure all your existing buttons and sliders are still working and properly positioned on the grid. Try resizing your browser window - everything should scale!

---

## Step 8: Adding File Upload for Background Images

### Understanding File Uploads

File uploads let users select files from their computer and use them in your program. Think of it like choosing a photo to upload to social media - you click a button, select a file, and it becomes part of the application.

**How it works**:
1. You create a file input button
2. User clicks the button
3. A file browser opens
4. User selects a file
5. Your program receives information about the file
6. You can then load and use that file

**Documentation**: [`createFileInput()`](https://p5js.org/reference/p5/createFileInput) creates a file upload button.

### Step 8 (A): Creating a Variable for the Background Image

First, you need a place to store the uploaded image. At the top of your code (before the track objects), create a variable to store the background image.

Think about what value it should start with - we don't have an image yet, so what should the initial value be? Use `null` to represent "no image yet".

**Understanding**:
- You're creating a variable to store the image
- `null` means "no image yet" - we'll set it when a user uploads an image
- `null` is a special value that means "nothing" or "empty"

**Why `null`?** It's a way to say "we don't have an image yet, but we will later." This is useful for checking if an image has been uploaded.

### Step 8 (B): Creating the File Input Button

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

**Test it!** You should see a "Choose File" button. Try clicking it - a file browser should open!

### Step 8 (C): Creating the Handler Function

When a user selects an image file, you need a function to handle it. Create a function that handles when a user selects an image file.

Think about:
1. What information will this function receive about the selected file?
2. How can you check if the file is actually an image (not some other type)?
3. If it is an image, how do you load it and store it in your variable?

The function will be called automatically by p5.js when a file is selected. It receives a file object that contains information about the selected file, including the file data that you can use to load the image. Check `file.type` to see if it's an image, and if so, use `loadImage()` to load the image from `file.data` and store it in your `bgImage` variable.

**Documentation**: [`loadImage()`](https://p5js.org/reference/p5/loadImage) loads image files.

**Why check file type?** Users might accidentally select the wrong type of file. This check prevents errors.

**Test it!** Try uploading an image - the file should be selected!

### Step 8 (D): Displaying the Background Image

Now you need to display the uploaded image as the background. In your `draw()` function, at the very beginning, you need to decide what to draw as the background.

Think about:
1. How can you check if an image has been uploaded?
2. If an image exists, how do you draw it to fill the entire canvas?
3. If no image exists yet, what should the background be?

This is a conditional check - if we have an image, use it; otherwise, use the default white background. This happens every frame in `draw()`, so the background will update immediately when an image is uploaded. Use the `image()` function to draw the image, and position it at `(0, 0)` with size `width` and `height` to fill the entire canvas.

**Documentation**: [`image()`](https://p5js.org/reference/p5/image) draws images.

**Test it!** Upload an image - it should now appear as the background, filling the entire canvas!

---

## Step 9: Adding File Upload for Track Sounds

### Understanding Sound Uploads

Now you want users to upload their own sounds for each track. This is similar to image uploads, but for audio files.

**The Logic**:
1. Add a file input property to the track object
2. Create a file input button in `setup()`
3. When a file is selected, handle it
4. Load the sound and replace the existing one

### Step 9 (A): Adding File Input Property to Track Objects

Each track needs to store its file input button. In both `track1` and `track2` objects, add:

```javascript
fileInput: null
```

**Understanding the code**:
- `fileInput: null` - we'll store the file input button here later
- Just like `slider: null` and `button: null`, this stores a UI element

### Step 9 (B): Creating the File Input Buttons

In your `setup()` function, after creating the background image file input, create file input buttons for both tracks' sounds.

Think about:
1. What function should run when a file is selected? (You'll need to pass both the file and which track it's for)
2. Where should these buttons be positioned? (Use your grid system!)
3. How can you restrict file selection to only audio files?

Create the file input using `createFileInput()` with a function that calls your sound upload handler, passing both the file and the track object. Position them using your grid helper functions, and restrict file selection to audio files only using `'accept', 'audio/*'`.

**Why pass the track object?** So the handler function knows which track to update. This lets us use the same handler for both tracks!

**Test it!** You should see file input buttons for both tracks!

### Step 9 (C): Creating the Sound Upload Handler

Create a function that handles when a user selects an audio file. Think about:
1. What information does this function need? (The file, and which track it's for)
2. How can you check if the file is actually an audio file?
3. If there's already a sound playing, what should happen to it?
4. How do you load the new sound and make it ready to play?

This function needs to handle replacing an existing sound. If a sound is currently playing, you should stop it first. Then load the new sound and set it up with the correct volume so it's ready to play. Check `file.type` to see if it's an audio file, and if so, stop any currently playing sound on that track, load the new sound from `file.data` using `loadSound()`, and set its volume using `setVolume()`.

**Documentation**: [`loadSound()`](https://p5js.org/reference/p5.sound/p5.SoundFile) loads sound files.

**Why stop the current sound?** If a sound is playing when a new one is uploaded, we should stop it first. Otherwise, both sounds might play at once, or the old sound might continue playing.

**Test it!** Upload audio files for both tracks - they should replace the default sounds! Try playing them to make sure they work.

---

## Step 10: Adding Touch Support for Mobile

### Understanding Touch Events

For mobile devices, you need to handle touch events differently from mouse clicks. This ensures your buttons work properly on phones and tablets.

**The Logic**: Touch events can trigger both touch and mouse events on mobile devices, causing buttons to be clicked twice. We need to prevent this double-triggering.

### Step 10 (A): Adding Touch Support Variables

**What you need to do**: At the top of your code, add variables to track touch usage:
- `touchUsed` - a boolean to track if touch was recently used
- `touchTimeout` - a variable to store the timeout

### Step 10 (B): Updating Button Touch Handlers

**What you need to do**: For each button, add a `touchStarted()` handler that:
1. Sets `touchUsed = true` to prevent mouse events from firing
2. Calls the toggle function
3. Clears the flag after a delay
4. Prevents the default mouse event

**Understanding the code**:
- `.touchStarted()` handles touch events on the button
- We prevent double-triggering by checking `touchUsed` in `mousePressed()`
- `setTimeout()` clears the flag after 400ms
- `preventDefault()` stops the mouse event from firing

**Test it!** Try your DJ deck on a mobile device - buttons should work smoothly without double-triggering!

---

## Step 11: Adding Labels and Improving User Experience

### Adding Labels

**The Logic**: Users need to know what each file input button does.

**What you need to do**: In your `draw()` function, add text labels above each file input button. Think about:
1. What text should each label say?
2. Where should each label be positioned? (Just above its corresponding button)
3. How should the text be aligned?

Use responsive text sizing: `textSize(min(width, height) * 0.025)` so labels scale with screen size.

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

## Putting It All Together (Updated)

### The Complete Flow

Your mixing deck should now work like this:

1. **preload()**: Load sound files into track objects
2. **setup()**: 
   - Create canvas (responsive size)
   - Create buttons with touch support
   - Create sliders
   - Create file inputs
   - Set initial volume
3. **draw()** (runs continuously):
   - Draw background (image or white)
   - Draw grid
   - Draw title
   - Draw labels
   - Update volume from sliders
   - Apply volume to playing sounds
4. **Click/Touch Detection**: When a button is clicked or touched, toggle that track
5. **File Uploads**: Users can upload background images and track sounds

### Testing Your Mixing Deck (Updated)

Test each feature:
- ✅ Click track1 button → sound1 plays
- ✅ Click track1 button again → sound1 pauses
- ✅ Click track2 button → sound2 plays
- ✅ Both tracks can play at the same time (mixing!)
- ✅ Move track1 slider → track1 volume changes
- ✅ Move track2 slider → track2 volume changes
- ✅ Sounds loop continuously
- ✅ Upload background image → displays as background
- ✅ Upload sound for Track 1 → replaces default sound
- ✅ Upload sound for Track 2 → replaces default sound
- ✅ Touch buttons on mobile → work without double-triggering
- ✅ Resize browser window → everything scales properly

### Troubleshooting (Updated)

**No sound?**
- Check that p5.sound library is included
- Check that sound files are in the `assets` folder or have been uploaded
- Check browser console for errors

**Buttons don't work?**
- Check that click detection logic is correct
- Check button positions match your click detection
- On mobile, check that touch events are properly handled

**Volume doesn't change?**
- Check that you're reading slider values in `draw()`
- Check that you're applying volume to playing sounds
- Check that volume conversion (divide by 100) is correct

**Image doesn't display after upload**
- Check that you're using `image()` in `draw()` and checking if `bgImage` exists

**Sound doesn't play after upload**
- Make sure you're calling `loadSound(file.data)` and setting the volume

---

## Customization Ideas (Updated)

Now that your mixing deck works, try customizing it:

- **Upload your favorite songs**
- **Upload custom background images**
- **Change button positions and sizes**
- **Change slider positions**
- **Add a title or labels**
- **Change colors**
- **Add more tracks**
- **Add visual feedback when tracks are playing**
- **Share your DJ deck as a mobile app!**

**Remember**: Experimentation is how you learn! Try things, see what happens, and learn from it.

---

## Congratulations! 🎉

You've built a fully functional, customizable DJ mixing deck that works on desktop and mobile! You've learned:
- How to organize code using objects
- How to load and play multiple sounds
- How to create interactive buttons with touch support
- How to create and use sliders
- How to control volume in real-time
- How to mix sounds together
- How to use a grid system for responsive layout
- How to handle file uploads (images and sounds)
- How to create mobile-friendly interfaces
- How to publish your app as a mobile application!

These concepts will help you build even more complex interactive applications!

