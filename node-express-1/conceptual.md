### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
To manage asynchronous code in JavaScript, you can use callbacks, Promises, async/await, generators, and event emitters.
- What is a Promise?
A Promise is a JavaScript object representing the outcome (success or failure) of an asynchronous operation.
- What are the differences between an async function and a regular function?
Async functions return Promises implicitly and allow asynchronous code execution, while regular functions are synchronous by default.
- What is the difference between Node.js and Express.js?
Node.js is a JavaScript runtime, while Express.js is a web framework built on Node.js for creating web applications.
- What is the error-first callback pattern?
The error-first callback pattern is a convention in Node.js where callback functions take an error parameter as the first argument.
- What is middleware?
Middleware in web frameworks like Express.js are functions that process requests before they reach the final handler.
- What does the `next` function do?
In Express.js middleware, the next function passes control to the next middleware in the stack.
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
Issues in the provided code include sequential HTTP requests, a lack of error handling, and non-descriptive variable names.