// import diaryData from '../../data/entries.json'; // Nolonger needed because we handled the type asertion
import diaries from '../../data/entries'; // Converted json file to a ts file

import {
  DiaryEntry,
  NonSensitiveDiaryEntry,
  // Visibility,
  // Weather,
  NewDiaryEntry,
} from '../types';

// const diaries: DiaryEntry[] = diaryData as DiaryEntry[];  // Type assertion not necessary anymore

// PICK
// const getNonSensitiveEntries = (): Pick<
//   DiaryEntry,
//   'id' | 'date' | 'weather' | 'visibility'
// >[] => {
//   // ...
// };

// OMIT
// const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
//   // ...

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

const addDiary = (
  // date: string,
  // weather: Weather,
  // visibility: Visibility,
  // comment: string
  entry: NewDiaryEntry
): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    // date,
    // weather,
    // visibility,
    // comment,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
