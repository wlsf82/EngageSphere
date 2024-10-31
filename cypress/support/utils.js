/**
 * This JavaScript code defines a function named capitalizeFirstLetter,
 * which takes a single string parameter, str, and returns a new string
 * with the first letter capitalized and the rest of the string in lowercase.
 *
 * Here's a breakdown of how it works:
 *
 * 1. str.charAt(0).toUpperCase(): This part takes the first character of str
 * using charAt(0), then converts it to uppercase using toUpperCase().
 *
 * 2. str.slice(1).toLowerCase(): This part takes the rest of the string
 * (starting from the second character) using slice(1),
 * then converts it to lowercase using toLowerCase().
 *
 * 3. Template literal: The function returns a template literal that combines these two parts,
 * resulting in a string with the first letter capitalized and the remaining letters in lowercase.
 *
 * Example:
 *
 * capitalizeFirstLetter("hello WORLD"); // "Hello world"
 *
 * This function is useful for normalizing strings to a "capitalized" format.
 */

export default function capitalizeFirstLetter(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`
}
