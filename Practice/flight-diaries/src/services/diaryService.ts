// import diaryData from '../../data/entries.json'; // Nolonger needed because we handled the type asertion
import diaries from '../../data/entries'; // Converted json file to a ts file

import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

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

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
};
