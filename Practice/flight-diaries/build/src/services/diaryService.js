"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import diaryData from '../../data/entries.json'; // Nolonger needed because we handled the type asertion
const entries_1 = __importDefault(require("../../data/entries")); // Converted json file to a ts file
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
const getNonSensitiveEntries = () => {
    return entries_1.default.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const getEntries = () => {
    return entries_1.default;
};
const findById = (id) => {
    const entry = entries_1.default.find((d) => d.id === id);
    return entry;
};
const addDiary = (
// date: string,
// weather: Weather,
// visibility: Visibility,
// comment: string
entry) => {
    const newDiaryEntry = Object.assign({ id: Math.max(...entries_1.default.map((d) => d.id)) + 1 }, entry);
    entries_1.default.push(newDiaryEntry);
    return newDiaryEntry;
};
exports.default = {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
};
