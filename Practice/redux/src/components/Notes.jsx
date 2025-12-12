import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important)
  })

  const handleToggleImportanceOf = async (id) => {
    // console.log(notes.find((note) => note.id === id))
    const note = notes.find((note) => note.id === id)
    // console.log(note)
    const noteToUpdate = { ...note, important: !note.important }
    // console.log(noteToUpdate)
    const updatedNote = await noteService.updateNote(noteToUpdate)
    // dispatch(toggleImportanceOf(id))
    dispatch(toggleImportanceOf(updatedNote))
  }
  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          // handleClick={() => dispatch(toggleImportanceOf(note.id))}
          handleClick={() => handleToggleImportanceOf(note.id)}
        />
      ))}
    </ul>
  )
}

export default Notes
