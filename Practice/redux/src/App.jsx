// import { createStore } from 'redux'
// // import noteReducer from './reducers/noteReducer'
// import { createNote, toggleImportanceOf } from './reducers/noteReducer'
// import { useSelector, useDispatch } from 'react-redux'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

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

// const noteReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'NEW_NOTE':
//       // state.push(action.payload)
//       return state.concat(action.payload)
//     // case 'TOGGLE_IMPORTANCE':
//     //   return state.concat()
//     default:
//       return state
//   }
// }

// const store = createStore(counterReducer)
// const store = createStore(noteReducer)
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

// useDispatch(
//   createNote({
//     type: 'NEW_NOTE',
//     payload: {
//       content: 'the app state is in redux store',
//       important: true,
//       id: 1,
//     },
//   })
// )

// useSelector(
//   createNote({
//     type: 'NEW_NOTE',
//     payload: {
//       content: 'state changes are made with acions',
//       important: false,
//       id: 2,
//     },
//   })
// )

// const filtereSelected = (value) => {
//   console.log(value)
// }

const App = () => {
  // const dispatch = useDispatch()
  // const notes = useSelector((state) => state)

  // const addNote = (event) => {
  //   event.preventDefault()
  //   const content = event.target.note.value
  //   event.target.note.value = ''
  //   dispatch(createNote(content))
  // }

  // const toggleImportance = (id) => {
  //   dispatch(toggleImportanceOf(id))
  // }
  return (
    <div>
      {/* <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form> */}
      <NoteForm />
      <VisibilityFilter />
      {/* <div>
        <input
          type="radio"
          name="filter"
          onChange={() => filtereSelected('ALL')}
        />
        all
        <input
          type="radio"
          name="filter"
          onChange={() => filtereSelected('IMPORTANT')}
        />
        important
        <input
          type="radio"
          name="filter"
          onChange={() => filtereSelected('NONIMPORTANT')}
        />
        nonimportant
      </div> */}
      <Notes />
      {/* <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default App
