const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'TEST') {
    // Conditional so it doesn't print to the console if in the test environment
    console.error(...params)
  }
}

module.exports = { info, error }
