import { NewDiaryEntry, Weather, Visibility } from './types';
import * as z from 'zod';

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const parseComment = (comment: unknown): string => {
//   if (!comment || !isString(comment)) {
//     throw new Error('Incorrect or missing comment');
//   }
//   return comment;
// };

// Using ZOD to parse primitive valued fields
// const parseComment = (comment: unknown): string => {
//   return z.string().parse(comment);
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//   if (!date || !isString(date) || !isDate(date)) {
//     throw new Error('Incorrect or missing date' + date);
//   }
//   return date;
// };

// const isWeather = (str: string): str is Weather => {
//   return ['sunny', 'rainy', 'cloudy', 'stromy'].includes(str);
// };

// const isWeather = (param: string): param is Weather => {
//   return Object.values(Weather)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseWeather = (weather: unknown): Weather => {
//   if (!weather || !isString(weather) || !isWeather(weather)) {
//     throw new Error('Incorrect or missing weather: ' + weather);
//   }
//   return weather;
// };

// const isVisibility = (param: string): param is Visibility => {
//   return Object.values(Visibility)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//   // check !visibility removed
//   if (!isString(visibility) || !isVisibility(visibility)) {
//     // if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
//     throw new Error('Incorrect or missing visibility: ' + visibility);
//   }
//   return visibility;
// };

export const NewEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional(),
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);
};

// const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   console.log(object); // now that the oject is no longer used.
//   if (!object || typeof object !== 'object') {
//     throw new Error('Incorrect or missing data');
//   }

//   if (
//     'comment' in object &&
//     'date' in object &&
//     'weather' in object &&
//     'visibility' in object
//   ) {

//     // REPLACED
//     // const newEntry: NewDiaryEntry = {
//     //   comment: z.string().optional().parse(object.comment),
//     //   date: z.iso.date().parse(object.date),
//     //   weather: z.enum(Weather).parse(object.weather),
//     //   visibility: z.enum(Visibility).parse(object.visibility),
//     // };

//     // return newEntry;

//     // const newEntry: NewDiaryEntry = {
//     //   comment: parseComment(object.comment),
//     //   date: parseDate(object.date),
//     //   weather: parseWeather(object.weather),
//     //   visibility: parseVisibility(object.visibility),
//     // };
//   }
//   // const newEntry: NewDiaryEntry = {
//   //   comment: parseComment(object.comment),
//   //   date: parseDate(object.date),
//   //   weather: parseWeather(object.weather),
//   //   visibility: parseVisibility(object.visibility),
//   // };

//   // const newEntry: NewDiaryEntry = {
//   //   // Just some dummy values to pass the type check
//   //   weather: 'cloudy',
//   //   visibility: 'great',
//   //   date: '2026-01-01',
//   //   comment: 'fake news',
//   // };
//   // return newEntry;

//   throw new Error('Incorrect data: some fields are missing');
// };

export default toNewDiaryEntry;
