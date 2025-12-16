import { useState } from 'react'

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero,
  }
}

const useField = (type) => {
  // Type is received as a parameter to set the value
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

// WITH PROPS SIMPLIFIED
const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}

// WITH FORMS AND MULTIPLE INPUTS
// const App = () => {
//   const [name, setName] = useState('')
//   const [born, setBorn] = useState('')
//   const [height, setHeight] = useState('')

//   return (
//     <div>
//       <form>
//         <input type={name.type} value={name.value} onChange={name.onChange} />
//         <input type={born.type} value={born.value} onChange={born.onChange} />
//         <input
//           type={height.type}
//           value={height.value}
//           onChange={height.onChange}
//         />
//       </form>
//     </div>
//   )
// return (
//   <div>
//     <form>
//       name:
//       <input
//         type="text"
//         value={name}
//         onChange={(event) => setName(event.target.value)}
//       />
//       <br />
//       birthdate:
//       <input
//         type="date"
//         value={born}
//         onChange={(event) => setBorn(event.target.value)}
//       />
//       <br />
//       height:
//       <input
//         type="number"
//         value={height}
//         onChange={(event) => setHeight(event.target.value)}
//       />
//     </form>
//     <div>
//       {name} {born} {height}
//     </div>
//   </div>
// )
// }

// COUNTERS

// const App = () => {
//   const left = useCounter()
//   const right = useCounter()

//   return (
//     <div>
//       {left.value}
//       <button onClick={left.increase}>left</button>
//       <button onClick={right.increase}>right</button>
//       {right.value}
//     </div>
//   )
// }

// const App = () => {
//   const counter = useCounter()

//   return (
//     <div>
//       <div>{counter.value}</div>
//       <button onClick={counter.increase}>plus</button>
//       <button onClick={counter.decrease}>minus</button>
//       <button onClick={counter.zero}>zero</button>
//     </div>
//   )
// }

// const App = () => {
//   const [counter, setCounter] = useState(0)

//   return (
//     <div>
//       <div>{counter}</div>
//       <button onClick={() => setCounter(counter + 1)}>plus</button>
//       <button onClick={() => setCounter(counter - 1)}>minus</button>
//       <button onClick={() => setCounter(0)}>zero</button>
//     </div>
//   )
// }
