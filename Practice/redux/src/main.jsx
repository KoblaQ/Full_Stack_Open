import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import { createStore } from 'redux'

// const counterReducer = (state, action) => {
//   if (action.type === 'INCREMENT') {
//     return state + 1
//   } else if (action.type === 'DECREMENT') {
//     return state - 1
//   } else if (action.type === 'ZERO') {
//     return 0
//   }

//   return state
// }

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     case 'ZERO':
//       return 0
//     default: // If none of the above matches, code comes here
//       return state
//   }
// }

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      // state.push(action.payload)
      return state.concat(action.payload)
    // case 'TOGGLE_IMPORTANCE':
    //   return state.concat()
    default:
      return state
  }
}

// const store = createStore(counterReducer)
const store = createStore(noteReducer)
// store.subscribe(() => {
//   const storeNow = store.getState()
//   console.log(storeNow)
// })
// console.log(store.getState())
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })

// // console.log(store.getState())
// store.dispatch({ type: 'ZERO' })
// store.dispatch({ type: 'DECREMENT' })
// // console.log(store.getState())

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with acions',
    important: false,
    id: 2,
  },
})

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
    // <div>
    //   <div>{store.getState()}</div>
    //   <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>
    //     plus
    //   </button>
    //   <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
    //     minus
    //   </button>
    //   <button onClick={() => store.dispatch({ type: 'ZERO' })}>zero</button>
    // </div>
  )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
