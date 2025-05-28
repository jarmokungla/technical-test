💽 1. PostgreSQL Logical Puzzle
Prompt:
You have a sales table with columns: id, user_id, amount, created_at.

Write a single SQL query that returns the user_id who had the highest total sales in any given day.


🔁 2. Async JavaScript Teaser
Prompt:
You have an array of URLs and need to fetch them in sequence, waiting for each to finish before moving to the next. Write a function that takes an array of URLs and logs the result of each fetch in order.

const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];

async function fetchSequentially(urls) {
  // Your code here
}

🔄 3. Node.js Concurrency Control
Prompt:
Implement a simple rate limiter in Node.js using only native modules. Limit to 3 requests per user per minute. Don’t use external packages.

API signature:

// Express-style middleware
function rateLimiter(req, res, next) {
  // Your code
}
