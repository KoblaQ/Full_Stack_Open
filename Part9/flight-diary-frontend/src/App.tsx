import { useEffect, useState } from 'react';
import { getAllEntries, createEntry } from './services/diaryServices';
import type { DiaryEntry, NewDiaryEntry } from './types';
import axios from 'axios';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    weather: '',
    visibility: '',
    comment: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    const { name, value } = event.target;

    setNewEntry((newEntry) => ({ ...newEntry, [name]: value }));
  };

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createEntry(newEntry)
      .then((data: DiaryEntry) => {
        setEntries(entries.concat(data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          // console.log(error.status);
          // console.log(error.response?.data);
          setErrorMessage(error.response?.data);
        }
      });
    // console.log(newEntry);
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={entryCreation}>
        <div>
          <label htmlFor="date">
            date
            <input
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="visibility">
            visibility <label htmlFor="great">great</label>
            <input
              type="radio"
              id="great"
              name="visibility"
              value="great"
              checked={newEntry.visibility === 'great'}
              onChange={handleChange}
            />
            <label htmlFor="good">good</label>
            <input
              type="radio"
              id="good"
              name="visibility"
              value={'good'}
              checked={newEntry.visibility === 'good'}
              onChange={handleChange}
            />
            <label htmlFor="ok">ok</label>
            <input
              type="radio"
              id="ok"
              name="visibility"
              value={'ok'}
              checked={newEntry.visibility === 'ok'}
              onChange={handleChange}
            />
            <label htmlFor="poor">poor</label>
            <input
              type="radio"
              id="poor"
              name="visibility"
              value={'poor'}
              checked={newEntry.visibility === 'poor'}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="weather">
            weather <label htmlFor="sunny">sunny</label>
            <input
              type="radio"
              name="weather"
              id="sunny"
              value={'sunny'}
              checked={newEntry.weather === 'sunny'}
              onChange={handleChange}
            />
            <label htmlFor="rainy">rainy</label>
            <input
              type="radio"
              name="weather"
              id="rainy"
              value={'rainy'}
              checked={newEntry.weather === 'rainy'}
              onChange={handleChange}
            />
            <label htmlFor="cloudy">cloudy</label>
            <input
              type="radio"
              name="weather"
              id="cloudy"
              value={'cloudy'}
              checked={newEntry.weather === 'cloudy'}
              onChange={handleChange}
            />
            <label htmlFor="stormy">stormy</label>
            <input
              type="radio"
              name="weather"
              id="stormy"
              checked={newEntry.weather === 'stormy'}
              value={'stormy'}
              onChange={handleChange}
            />
            <label htmlFor="windy">windy</label>
            <input
              type="radio"
              name="weather"
              id="windy"
              checked={newEntry.weather === 'windy'}
              value={'windy'}
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
