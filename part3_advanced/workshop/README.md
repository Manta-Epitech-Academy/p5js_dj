# Workshop: DJ Mixing Deck - Advanced - Metadata

## Target Audience

**Primary Audience**: High school students (ages 14-18) who have completed the DJ Mixing Deck Starter and Customization workshops.

**Prerequisites**:
- Completion of Workshop: DJ Mixing Deck Starter (or equivalent experience)
- Completion of Workshop: DJ Mixing Deck Customization (or equivalent experience)
- Understanding of p5.js objects and properties
- Familiarity with sound playback and volume control in p5.js
- Understanding of file handling and uploads
- Basic understanding of trigonometry concepts
- Ability to follow step-by-step instructions

**Learning Level**: Advanced

**Accessibility**: This workshop builds on the DJ Mixing Deck Customization. Students should have a working customizable DJ deck before adding advanced features. The goal is to introduce advanced audio control, visualization, and code organization.

---

## Writing Style & Pedagogical Approach

### Why Code is Not Directly Given

**1. Active Learning Over Passive Consumption**
- Students learn better by constructing code themselves rather than copying it
- When students write code themselves, they develop deeper understanding
- Copying code creates a false sense of understanding - students think they know it because they can see it works, but they may not understand why

**2. Problem-Solving Skills Development**
- By providing logic, concepts, and examples instead of code, students must think through the problem
- This develops critical thinking and problem-solving abilities
- Students learn to translate concepts into code, which is a core programming skill

**3. Reduced Cognitive Load**
- Too much code at once can overwhelm beginners
- Focusing on one concept at a time allows students to understand before moving forward
- Students can process the "why" before the "how"

**4. Encourages Exploration and Experimentation**
- Without complete code solutions, students are more likely to try variations
- Mistakes become learning opportunities rather than failures
- Students develop confidence by figuring things out themselves

**5. Real-World Application**
- Professional developers rarely have complete code solutions - they have requirements, logic, and documentation
- This approach mirrors real-world development where you must translate requirements into code
- Students learn to read documentation and apply concepts, not just copy code

### Pedagogical Value

**Conceptual Understanding First**
- Students learn the "why" before the "how"
- Understanding the logic behind code makes it easier to remember and apply
- Concepts transfer to other programming languages and projects

**Scaffolded Learning**
- Concepts are introduced progressively
- Each step builds on previous understanding
- Analogies and real-world examples help students connect new concepts to known experiences

**Multiple Learning Styles**
- Visual learners: Schema placeholders and diagrams
- Auditory learners: Verbal explanations and analogies
- Kinesthetic learners: Hands-on coding practice
- Reading learners: Written explanations and documentation links

**Ownership and Pride**
- Students create something that is truly theirs
- The final product represents their understanding and effort
- This builds confidence and motivation to continue learning

**Error-Driven Learning**
- Students will make mistakes, and that's valuable
- Working through errors teaches debugging skills
- Understanding why something doesn't work is as important as understanding why it does

**Documentation Skills**
- Students learn to read and use official documentation
- This is a critical real-world skill
- Links to documentation teach students to find answers independently

---

## Duration Estimation

**Total Workshop Duration**: 2 - 2.5 hours

### Breakdown by Section:

**Introduction & Setup** (10-15 minutes)
- Welcome and introduction
- Understanding advanced features goals
- Review of DJ Mixing Deck Customization concepts
- Starting with working customizable DJ deck
- Testing existing functionality

**Step 1: Adding Time Sliders** (30-35 minutes)
- Understanding time navigation in audio
- Creating time slider elements using grid system
- Updating slider position during playback
- Jumping to specific positions in tracks

**Step 2: Displaying Time in MM:SS Format** (20-25 minutes)
- Formatting time as minutes:seconds
- Displaying elapsed and total time
- Understanding time conversion

**Step 3: Adding a Crossfader** (30-35 minutes)
- Understanding crossfader concept
- Creating crossfader slider using grid system
- Using trigonometry for smooth transitions
- Applying crossfade to volume control

**Step 4: Adding BPM Visualization** (30-35 minutes)
- Understanding audio amplitude analysis
- Creating amplitude analyzers
- Visualizing beats with pulsating circles
- Connecting visualization to audio

**Step 5: Updating Labels and Layout** (15-20 minutes)
- Adding duration labels using grid positioning
- Adding crossfader label
- Updating layout to match grid system

**Step 6: Refactoring Code Organization** (20-25 minutes)
- Refactoring into helper functions
- Organizing setup and draw functions
- Understanding code structure

**Step 7: Final Testing** (15-20 minutes)
- Final integration
- Testing all features
- Troubleshooting
- Advanced customization suggestions
- Q&A and wrap-up

### Factors Affecting Duration:

**Faster Groups** (2 hours):
- Students with good grasp of previous concepts
- Quick learners who understand trigonometry
- Good problem-solving skills
- Minimal technical issues

**Average Groups** (2-2.5 hours):
- Students comfortable with previous basics
- Normal learning pace
- Some experimentation and questions
- Occasional troubleshooting

**Slower Groups** (2.5-3 hours):
- Students needing review of previous concepts
- More time for trigonometry concept explanation
- Frequent questions and clarification
- More time for experimentation
- Technical difficulties
- Additional support needed

### Tips for Timing:

- **Plan for flexibility**: Allow extra time for questions and exploration
- **Break points**: Consider a break after Step 3
- **Differentiation**: Faster students can add more advanced features while others catch up
- **Support**: Have helpers available for students who need extra assistance
- **Optional extensions**: Have additional challenges ready for early finishers

### Recommended Workshop Structure:

1. **Introduction** (10 min)
2. **Step 1: Time Sliders** (35 min)
3. **Step 2: Time Display** (25 min)
4. **Short Break** (10 min)
5. **Step 3: Crossfader** (35 min)
6. **Step 4: BPM Visualization** (35 min)
7. **Step 5: Labels and Layout** (20 min)
8. **Step 6: Code Organization** (25 min)
9. **Step 7: Final Testing** (20 min)

**Total**: ~2.5 hours with breaks and flexibility

---

## Success Criteria

By the end of this workshop, students should be able to:
- ✅ Understand time navigation in audio tracks
- ✅ Create and use time sliders for seeking through tracks (using grid system)
- ✅ Format and display time in MM:SS format
- ✅ Understand and implement crossfader functionality
- ✅ Use trigonometry (cos/sin) for smooth audio transitions
- ✅ Create amplitude analyzers for audio visualization
- ✅ Visualize BPM with pulsating circles centered on buttons
- ✅ Update labels and layout using grid system
- ✅ Organize code into helper functions
- ✅ Refactor code for better structure and readability
- ✅ Understand advanced audio control concepts
- ✅ Read and use documentation for advanced p5.js features
- ✅ Troubleshoot advanced audio and visualization errors
- ✅ Have a functional, advanced DJ mixing deck with all features

**Note**: Not all students will complete everything perfectly, and that's okay. The goal is understanding advanced audio control, visualization, and code organization, not perfection.

---

## Difficulty Level Estimation

Based on Source Lines of Code (SLOC) analysis:

| Part | Code Lines | Increase | Difficulty Level |
|------|------------|----------|------------------|
| **Part 3: Advanced** | 297 lines | +55.5% (+106 lines from Part 2) | ⭐⭐⭐ Advanced |

**Notes**:
- **Part 2 → Part 3**: A substantial increase (+55.5%) as participants add advanced features like time control, crossfader logic with trigonometry, and amplitude analysis for visualization.
- This part introduces more complex mathematical concepts (trigonometry, time calculations) and audio analysis.
- Code organization becomes more important as the codebase grows significantly.

**Planning considerations**:
- Trigonometry concepts (cos/sin) may need additional explanation for students unfamiliar with these functions.
- Audio amplitude analysis requires understanding how to connect analyzers to sound sources.
- Code organization (Step 6) helps manage the increased complexity but adds another learning step.
- Consider a break after Step 3 to let students digest the crossfader concepts before moving to visualization.

