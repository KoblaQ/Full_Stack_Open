import { useState, useEffect } from 'react';
import { type Note } from './types';
import { getAllNotes, createNote } from './services/noteService';

// interface Note {
//   id: string;
//   content: string;
// }

function App() {
  const [newNote, setNewNote] = useState('');
  // const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useState<Note[]>([{ id: '1', content: 'testing' }]);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNote({ content: newNote }).then((data) => {
      setNotes(notes.concat(data));
    });

    // axios
    //   .post<Note>('http://localhost:3001/notes', { content: newNote })
    //   .then((response) => {
    //     setNotes(notes.concat(response.data));
    //   });

    // const noteToAdd = {
    //   content: newNote,
    //   id: String(notes.length + 1),
    // };
    // setNotes(notes.concat(noteToAdd));
    setNewNote('');
  };

  useEffect(() => {
    getAllNotes().then((data) => {
      setNotes(data);
    });
  });
  // useEffect(() => {
  //   axios.get<Note[]>('http://localhost:3001/notes').then((response) => {
  //     // console.log(response.data);
  //     setNotes(response.data as Note[]); // Still not safe
  //   });
  // }, []);

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
