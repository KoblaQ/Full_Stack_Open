export const Weather = {
  Sunny: 'rainy',
  Cloud: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
};

export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
};

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
