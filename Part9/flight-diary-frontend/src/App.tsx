import { useEffect, useState } from 'react';
import { getAllEntries } from './services/diaryServices';
import type { DiaryEntry } from './types';

function App() {
  // const [entry, setEntry] = useState('')
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);
  console.log(entries);

  return (
    <div>
      <h3>Diary entries</h3>
      {entries.map((entry) => (
        <div>
          <h4 key={entry.id}>{entry.date}</h4>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
          <p>comments: {entry.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
