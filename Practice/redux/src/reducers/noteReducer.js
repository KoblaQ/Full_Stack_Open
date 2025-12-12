import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]

// const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      // const content = action.payload
      state.push(action.payload)
      // state.push({
      //   content,
      //   important: false,
      //   id: generateId(),
      // })
    },
    toggleImportanceOf(state, action) {
      // const id = action.payload
      const changedNote = action.payload
      // const noteToChange = state.find((n) => n.id === id)
      // const changedNote = {
      //   ...noteToChange,
      //   important: !noteToChange.important,
      // }

      // console.log(state) // prints unreadable version ( needs current to make it readable)
      // console.log(current(state))
      return state.map((note) =>
        note.id !== changedNote.id ? note : changedNote
      )
    },
    setNotes(state, action) {
      return action.payload
    },
  },
})

const { createNote, setNotes } = noteSlice.actions // taken from the export const side to standalone

// set notes thunk
export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const appendNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }
}

export const { toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer

// const noteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_NOTE':
//       // state.push(action.payload)
//       // return state.concat(action.payload)
//       return [...state, action.payload]
//     case 'TOGGLE_IMPORTANCE': {
//       const id = action.payload.id
//       const noteToChange = state.find((n) => n.id === id)
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       }
//       return state.map((note) => (note.id !== id ? note : changedNote))
//     }
//     default:
//       return state
//   }
// }

// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   }
// }

// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id },
//   }
// }

// export default noteReducer
