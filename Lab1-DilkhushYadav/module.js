//MODULE EXAMPLE

// Declaring an array named 'groceries' with three initial elements.
var groceries = ["apples", "oranges", "cherries"];

// Exporting the 'addString' function so it can be used in other modules.
export function addString(){
    // Logging the current state of the 'groceries' array before adding a new item.
    console.log(groceries);

    // Adding "Mango" to the 'groceries' array using the push() method.
    var newString = groceries.push("Mango");

    // Logging the updated 'groceries' array after the new item "Mango" has been added.
    console.log(groceries);
}

// Exporting the 'countString' function to count the number of items in the 'groceries' array.
export function countString(){
    // The length property returns the number of elements in the array.
    console.log(groceries.length);
}