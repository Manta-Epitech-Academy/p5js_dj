# Learn JavaScript in 5 Minutes (or more)

This is a concise introduction to JavaScript concepts used in this workshop. Get the basics fast!

**Important**: Reading this guide without trying the code yourself is useless! Open a code editor or the browser console and type the examples as you read. Learning to code requires practice, not just reading.

```javascript
///////////////////////////////////
// 1. Statements and Comments

// Statements are instructions that tell the computer what to do.
// Each statement usually ends with a semicolon (;)

doSomething(); // This is a statement

// Comments explain your code and are ignored by the computer.
// Single-line comments start with two slashes

/* Multi-line comments start with slash-star
   and end with star-slash */

///////////////////////////////////
// 2. Numbers and Basic Operations

// Numbers can be whole numbers or decimals.
// Both are just numbers in JavaScript.

3;        // = 3 (whole number)
1.5;      // = 1.5 (decimal)
42;       // = 42 (whole number)
0.5;      // = 0.5 (decimal)

// Basic arithmetic works as expected:
1 + 1;    // = 2 (addition)
10 - 3;   // = 7 (subtraction)
4 * 2;    // = 8 (multiplication)
8 / 2;    // = 4 (division)

// Division can give decimals:
5 / 2;    // = 2.5

// Special number values:
0;        // zero is a valid number
null;     // null means "no value" or "empty"
undefined; // undefined means "not yet assigned"

///////////////////////////////////
// 3. Strings (Text)

// Strings represent text and are created with quotes.
'Hello';           // Single quotes
"World";           // Double quotes - both work the same way
'123';             // This is a string, not a number!

// Strings can be combined with +
"Hello " + "world"; // = "Hello world"
"Score: " + 100;    // = "Score: 100"

///////////////////////////////////
// 4. Booleans (True/False)

// Booleans are true or false values.
true;   // = true
false;  // = false

// These values are used in conditions.

///////////////////////////////////
// 5. Variables and Assignment

// Variables store values so you can reuse them.
// Use `let` to declare a variable:

let myNumber = 5;    // Create variable "myNumber" with value 5
let myText = "Hi";   // Create variable "myText" with value "Hi"

// Variables can be reassigned (changed):
myNumber = 10;       // Now myNumber is 10
myText = "Hello";    // Now myText is "Hello"

// Variables can be declared without an initial value:
let x;               // x is undefined (not set yet)
x = 42;              // Now x is 42

// You can declare multiple variables at once:
let a = 1, b = 2, c = 3;

// Variables must be declared before use:
let result;
result = 10 + 5;     // result is now 15

///////////////////////////////////
// 6. Assignment Operations

// The equals sign (=) assigns a value to a variable.
let value = 10;      // Assign 10 to variable "value"

// Shorthand for math operations:
value += 5;          // Same as: value = value + 5; (value is now 15)
value -= 3;          // Same as: value = value - 3; (value is now 12)
value *= 2;          // Same as: value = value * 2; (value is now 24)
value /= 4;          // Same as: value = value / 4; (value is now 6)

///////////////////////////////////
// 7. Objects

// Objects store multiple values together.
// Each value has a label (called a property).

let person = {
    name: "Alice",      // property "name" with value "Alice"
    age: 30,            // property "age" with value 30
    isActive: true      // property "isActive" with value true
};

// Access object properties with a dot:
person.name;            // = "Alice"
person.age;             // = 30

// You can also use brackets:
person["name"];         // = "Alice" (same as person.name)
person["age"];          // = 30 (same as person.age)

// Change property values:
person.age = 31;        // Now person.age is 31

// Add new properties:
person.city = "Paris";  // Add property "city" with value "Paris"

// Properties can be any type:
let data = {
    number: 42,
    text: "hello",
    flag: true,
    value: null
};

// Objects can contain other objects:
let nested = {
    position: {
        x: 10,
        y: 20
    }
};
nested.position.x;      // = 10
nested.position.y;      // = 20

///////////////////////////////////
// 8. Functions

// Functions are reusable blocks of code.
// They run when you call them.

// Define a function:
function greet() {
    console.log("Hello!");
}

// Call the function:
greet();                // Runs the function, prints "Hello!"

// Functions can take values (called parameters):
function add(a, b) {
    return a + b;       // return gives back a value
}

// Call function with values:
add(2, 3);              // = 5
let sum = add(10, 5);   // sum is now 15

// Functions can return values:
function multiply(x, y) {
    return x * y;       // Return the result
}

let product = multiply(4, 7);  // product is now 28

// Functions without return return undefined (but can still affect the global state of your program):
function doSomething() {
    // No return statement
}
let result = doSomething();    // result is undefined

// Functions without names (anonymous functions):
let myFunction = function(x, y) {
    return x + y;
};
myFunction(3, 4);       // = 7

// You can pass functions as values:
function processNumber(value, operation) {
    return operation(value);
}

processNumber(5, function(n) {
    return n * 2;
});                      // = 10

///////////////////////////////////
// 9. Conditions (if/else)

// Conditions let you make decisions in code.
// Code only runs if a condition is true.

let age = 20;

if (age >= 18) {
    console.log("Adult");
}

// if/else provides two paths:
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

// Multiple conditions with else if:
if (age < 13) {
    console.log("Child");
} else if (age < 18) {
    console.log("Teen");
} else {
    console.log("Adult");
}

// Conditions use comparisons:
// === means "exactly equal to"
// !== means "not equal to"
// < means "less than"
// > means "greater than"
// <= means "less than or equal to"
// >= means "greater than or equal to"

let x = 5;
let y = 10;

x === 5;        // = true (x is exactly equal to 5)
x !== 5;        // = false (x is not equal to 5)
x < y;          // = true (5 is less than 10)
x > y;          // = false (5 is not greater than 10)
x <= 5;         // = true (5 is less than or equal to 5)

// Comparisons with strings:
"a" < "b";      // = true (alphabetical order)

// Checking for null or undefined:
let value = null;
if (value === null) {
    console.log("No value");
}

let name;
if (name === undefined) {
    console.log("Not set yet");
}

// Some values count as false, others count as true:
// False values: false, 0, "", null, undefined, NaN
// Everything else counts as true

if (0) {
    // This won't run (0 counts as false)
}

if (1) {
    // This will run (1 counts as true)
}

///////////////////////////////////
// 10. Combining Concepts

// Here's how everything works together:

let player = {
    name: "Bob",
    score: 0,
    isActive: true
};

function updateScore(player, points) {
    if (player.isActive) {
        player.score += points;
        return player.score;
    } else {
        return null;
    }
}

let newScore = updateScore(player, 10);
// newScore is now 10, player.score is also 10

// Check the result:
if (newScore !== null) {
    console.log("Score updated to " + newScore);
} else {
    console.log("Player is not active");
}

///////////////////////////////////
// Summary

// You now know:
// - Statements and comments
// - Numbers and basic math (+, -, *, /)
// - Strings (text with quotes)
// - Booleans (true/false)
// - Variables (let, assignment with =)
// - Objects (properties, dot and bracket notation)
// - Functions (define, call, parameters, return, anonymous)
// - Conditions (if/else, comparisons, ===, !==, <, >, <=, >=)
// - null and undefined
// - How to combine everything!

///////////////////////////////////
```

## Further Reading

This tutorial covers only the basics used in this workshop. To learn more JavaScript:

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) - Comprehensive JavaScript documentation
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [Learn X in Y Minutes: JavaScript](https://learnxinyminutes.com/javascript/) - Inspiration for this document

---

Originally created for the p5.js DJ Workshop.

