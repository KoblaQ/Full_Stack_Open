type Operation = 'multiply' | 'add' | 'divide'

// const calculator = (a: number, b: number, op: Operation) => {
//   if (op === 'multiply') {
//     return a * b
//   } else if (op === 'add') {
//     return a + b
//   } else if (op === 'divide') {
//     if (b === 0) return "can't divide by 0!"
//     return a / b
//   }
// }

// const calculator = (a: number, b: number, op: Operation): number => {
//   if (op === 'multiply') {
//     return a * b
//   } else if (op === 'add') {
//     return a + b
//   } else if (op === 'divide') {
//     if (b === 0) return 'this cannot be done'
//     return a / b
//   }
// }

// const calculator = (a: number, b: number, op: Operation): number | string => {
//   if (op === 'multiply') {
//     return a * b
//   } else if (op === 'add') {
//     return a + b
//   } else if (op === 'divide') {
//     if (b === 0) return "can't divide by 0!"
//     return a / b
//   }
// }

type Result = string | number

// const calculator = (a: number, b: number, op: Operation): Result => {
//   if (op === 'multiply') {
//     return a * b
//   } else if (op === 'add') {
//     return a + b
//   } else if (op === 'divide') {
//     if (b === 0) return "can't divide by 0!"
//     return a / b
//   }
// }

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!")
      return a / b
    case 'add':
      return a + b
    default:
      throw new Error('Operation is not multiply, add or divide!')
  }
}

// calculator(1, 2, 'yolo')

try {
  console.log(calculator(1, 5, 'divide'))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  // here we can not use error.message
  if (error instanceof Error) {
    // the tyope is narrowed and we can refer to error.message
    errorMessage += error.message
  }

  // here we can not use erorr.message
  console.log(errorMessage)
}

console.log(process.argv)
