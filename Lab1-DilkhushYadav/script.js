//DEMO BLOCKING VS NON-BLOCKING SCRIPT

//Below lines are blocking (synchronous) code.
console.log("Blocking code, before timeout");  // This will be printed first

// Blocking code - No setTimeout or async behavior
console.log("Synchronous 1");
console.log("Synchronous 2");
console.log("Synchronous 3");

console.log("Blocking code, after timeout");  // This will be printed last


//The event handler is an example of non-blocking code (asynchronous code) because it is only executed when the button is clicked.
console.log("Non-blocking code, before timeout");  // This will be printed first

// Non-blocking code - setTimeout introduces asynchronous behavior
setTimeout(() => {
  console.log("Content inside the setTimeout function");  // This will be printed after the synchronous code completes
}, 100);  // Timeout is set to 100 ms

console.log("Non-blocking code, after timeout");  // This will be printed second, right after the synchronous code