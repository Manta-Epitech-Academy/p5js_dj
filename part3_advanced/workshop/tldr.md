# Quick Reference: DJ Mixing Deck - Advanced Features

A quick guide for adding advanced features to your DJ deck.

**Prerequisites**: Complete Part 2: Customization first!

---

## Step 1: Adding Time Sliders

### Step 1A: Adding Time Slider Properties
- In track objects: `timeSlider: null`, `timeSliderPosition: { x: 0, y: 0 }`, `isDraggingTime: false`

### Step 1B: Creating Time Sliders
- In `setupTrackSliders()`: Create time slider with `.input()` handler
- Handler: Calculate target time from slider value (0-100) and sound duration
- Use: `track.sound.jump(targetTime)` to jump to position
- Position using `gridX()` and `gridY()` functions

### Step 1C: Updating Time Slider Positions
- Calculate positions using `gridX()` and `gridY()` functions
- Duration sliders at row 4: `gridY(4)`
- Track 1: `gridX(1)`, Track 2: `gridX(4)`

### Step 1D: Updating Time Sliders During Playback
- Create `updateTimeSliders()` and `updateTimeSlider(track)`
- Calculate progress: `(currentTime / duration) * 100`
- Update slider: `track.timeSlider.value(progress)`
- Call `updateTimeSliders()` in `draw()`

---

## Step 2: Displaying Time in MM:SS Format

### Step 2A: Creating a Time Formatting Function
- `formatTime(seconds)` - converts to "MM:SS" using `Math.floor()` and `padStart()`
- Formula: `Math.floor(seconds / 60)` for minutes, `seconds % 60` for seconds
- Format: `minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')`

### Step 2B: Displaying Time
- `drawTimeDisplay(track)` - shows "elapsed / total" format
- Use: `formatTime(currentTime)` and `formatTime(duration)`
- Position using `gridX()` and `gridY()` functions
- Call in `draw()` for each track

---

## Step 3: Adding a Crossfader

### Step 3A: Adding Crossfader Variables
- `let crossfader = null;`
- `let crossfaderValue = 50;`

### Step 3B: Creating the Crossfader Slider
- Create in `setupCrossfader()` function
- Position at row 5: `gridY(5)`, center: `width / 2`
- Call `setupCrossfader()` in `setup()`

### Step 3C: Implementing Crossfader Logic with Trigonometry
- `applyCrossfader()` - uses `cos()` and `sin()` for smooth transition
- Map crossfader (0-100) to angle (0 to π/2): `let angle = (crossfaderValue / 100) * (PI / 2);`
- `track1Volume = track1.volume * cos(angle)`
- `track2Volume = track2.volume * sin(angle)`
- Apply volumes to playing sounds
- Call `applyCrossfader()` in `draw()`

---

## Step 4: Adding BPM Visualization

### Step 4A: Setting Up Amplitude Analyzers
- In track objects: `amp: null`
- In `setup()`: `track1.amp = new p5.Amplitude();`, `track2.amp = new p5.Amplitude();`
- Connect: `track.amp.setInput(track.sound)` in `handleSoundUpload()`

### Step 4B: Adding Pulse Size Properties
- In track objects: `pulseSize: 80` (base size)

### Step 4C: Creating BPM Visualization Functions
- `getPulseSize(track)` - calculates size from amplitude: `80 + (track.amp.getLevel() * 100)`
- `drawBeatCircle(x, y, size, color)` - draws one circle
- `drawBPMVisualization()` - main function that draws both circles
- Position circles centered on play/pause buttons: `track.buttonPosition.x`, `track.buttonPosition.y`
- Call `drawBPMVisualization()` in `draw()`

---

## Step 5: Updating Labels and Layout

### Step 5A: Adding Duration Labels
- Add "duration" labels above time sliders
- Use same text size as volume labels
- Position using `gridX()` and `gridY()` functions

### Step 5B: Adding Crossfader Label
- Add "crossfader" label above crossfader slider
- Use same text size as volume labels
- Position at row 5, center: `width / 2`

### Step 5C: Updating Layout
- Use grid system for all positioning
- All UI elements aligned to 6x6 grid
- Duration sliders match volume slider width

---

## Step 6: Refactoring Code Organization

### Helper Functions to Create
- **Setup**: `setupFileInputs()`, `setupTrackButton()`, `setupTrackSliders()`, `setupCrossfader()`
- **Draw**: `drawBackground()`, `drawLabels()`, `drawTimeDisplay()`, `drawBPMVisualization()`, `drawGrid()`
- **Update**: `updateVolumes()`, `updateTimeSliders()`, `updateTimeSlider(track)`, `applyCrossfader()`
- **Control**: `pauseTrack()`, `playTrack()`, `stopTrack()`, `connectAmplitudeAnalyzer()`
- **Utility**: `formatTime(seconds)`, `getPulseSize(track)`, `gridX(cellX)`, `gridY(cellY)`

---

## Step 7: Final Testing

### Testing Checklist
- ✅ Time sliders update and allow jumping
- ✅ Time displays in MM:SS format
- ✅ Crossfader smoothly transitions between tracks
- ✅ BPM visualization pulses with beat
- ✅ All UI elements positioned on grid
- ✅ Code organized into small functions
- ✅ All features from Part 2 still work

---

## Key Functions

- `sound.duration()` - gets total track length
- `sound.currentTime()` - gets current playback time
- `sound.jump(time)` - jumps to specific time
- `track.amp.getLevel()` - gets audio amplitude (0.0 to 1.0)
- `cos(angle)` / `sin(angle)` - for smooth crossfade curves
- `String.padStart(2, '0')` - pads numbers to 2 digits
- `Math.floor()` - rounds down to nearest integer
- `%` operator - gets remainder (for seconds in MM:SS)
- `new p5.Amplitude()` - creates amplitude analyzer
- `gridX(cellX)` - returns X position for column
- `gridY(cellY)` - returns Y position for row

---

## Troubleshooting

- **Time slider not updating**: Check `updateTimeSliders()` called in `draw()`
- **Can't jump**: Check `.input()` handler calls `sound.jump()`
- **Crossfader not smooth**: Use `cos()` and `sin()` with angle (0 to π/2)
- **No BPM visualization**: Check amplitude analyzers connected with `setInput()`
- **Wrong positions**: Use `gridX()` and `gridY()` functions for all positioning
- **Text size inconsistent**: Use same text size for all labels (duration, crossfader, volume)
