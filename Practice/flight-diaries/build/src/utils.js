"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseComment = (comment) => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }
    return comment;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date' + date);
    }
    return date;
};
// const isWeather = (str: string): str is Weather => {
//   return ['sunny', 'rainy', 'cloudy', 'stromy'].includes(str);
// };
const isWeather = (param) => {
    return Object.values(types_1.Weather)
        .map((v) => v.toString())
        .includes(param);
};
const parseWeather = (weather) => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};
const isVisibility = (param) => {
    return Object.values(types_1.Visibility)
        .map((v) => v.toString())
        .includes(param);
};
const parseVisibility = (visibility) => {
    // check !visibility removed
    if (!isString(visibility) || !isVisibility(visibility)) {
        // if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};
const toNewDiaryEntry = (object) => {
    console.log(object); // now that the oject is no longer used.
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('comment' in object &&
        'date' in object &&
        'weather' in object &&
        'visibility' in object) {
        const newEntry = {
            comment: parseComment(object.comment),
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
        };
        return newEntry;
    }
    // const newEntry: NewDiaryEntry = {
    //   comment: parseComment(object.comment),
    //   date: parseDate(object.date),
    //   weather: parseWeather(object.weather),
    //   visibility: parseVisibility(object.visibility),
    // };
    // const newEntry: NewDiaryEntry = {
    //   // Just some dummy values to pass the type check
    //   weather: 'cloudy',
    //   visibility: 'great',
    //   date: '2026-01-01',
    //   comment: 'fake news',
    // };
    // return newEntry;
    throw new Error('Incorrect data: some fields are missing');
};
exports.default = toNewDiaryEntry;
