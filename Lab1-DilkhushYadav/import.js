//MODULE EXAMPLE
//The logger is for logging messages to the console.

// Importing two functions, 'addString' and 'countString', from the module 'module.js'.
import { addString, countString } from "./module.js";

// Calling the 'addString' function to add an item ("Mango") to the 'groceries' array 
// and log the array before and after the addition.
addString();

// Calling the 'countString' function to log the current length of the 'groceries' array.
// This will show the number of items in the array after "Mango" was added.
countString();