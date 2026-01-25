import { useEffect, useState } from 'react';
import { getAllEntries, createEntry } from './services/diaryServices';
import type { DiaryEntry, NewDiaryEntry } from './types';

function App() {
  // const [entry, setEntry] = useState('')
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    weather: '',
    visibility: '',
    comment: '',
  });

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setNewEntry((newEntry) => ({ ...newEntry, [name]: value }));
  };

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createEntry(newEntry).then((data: DiaryEntry) => {
      setEntries(entries.concat(data));
    });
    console.log(newEntry);
    // const date = event.target.date;
    setNewEntry({
      date: '',
      weather: '',
      visibility: '',
      comment: '',
    });
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={entryCreation}>
        <div>
          <label htmlFor="date">
            date
            <input
              type="text"
              name="date"
              value={newEntry.date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="visibility">
            visibility
            <input
              type="text"
              name="visibility"
              value={newEntry.visibility}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="weather">
            weather
            <input
              type="text"
              name="weather"
              value={newEntry.weather}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="comment">
            comment
            <input
              type="text"
              name="comment"
              value={newEntry.comment}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>

      <h3>Diary entries</h3>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h4>{entry.date}</h4>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
          <p>comments: {entry.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
