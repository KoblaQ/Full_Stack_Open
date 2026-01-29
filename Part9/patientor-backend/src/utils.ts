import { NewPatientEntry, Gender, EntryWithoutId } from './types';
import { z } from 'zod';

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  occupation: z.string(),
  ssn: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};

export const HealthCheckEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number(),
});

export const HospitalEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  // type: z.string(),
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export const OccupationalHealthcareEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal('OccupationalHealthcare'), // Literal because the values need to be exactly the same
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const toNewEntry = (object: unknown): EntryWithoutId => {
  switch ((object as { type: string }).type) {
    case 'HealthCheck':
      return HealthCheckEntrySchema.parse(object);
    case 'Hospital':
      return HospitalEntrySchema.parse(object);
    case 'OccupationalHealthcare':
      return OccupationalHealthcareEntrySchema.parse(object);
    default:
      throw new Error(
        'Incorrect or missing type: ' + (object as { type: string }).type,
      );
  }
};

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const parseName = (name: unknown): string => {
//   if (!name || !isString(name)) {
//     throw new Error('Incorrect or missing name: ' + name);
//   }
//   return name;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDateOfBirth = (dateOfBirth: unknown): string => {
//   if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
//     throw new Error('Incorrect or missing date ' + dateOfBirth);
//   }
//   return dateOfBirth;
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!gender || !isString(gender) || !isGender(gender)) {
//     throw new Error('Incorrect or missing gender: ' + gender);
//   }
//   return gender;
// };

// const parseOccupation = (occupation: unknown): string => {
//   if (!occupation || !isString(occupation)) {
//     throw new Error('Incorrect or missing occupation ' + occupation);
//   }
//   return occupation;
// };

// const parseSsn = (ssn: unknown): string => {
//   if (!ssn || !isString(ssn)) {
//     throw new Error('Incorrect or missing ssn ' + ssn);
//   }
//   return ssn;
// };

// const toNewPatientEntry = (object: unknown): NewPatientEntry => {
//   console.log(object); // placeholder for object not being used yet

//   if (!object || typeof object !== 'object') {
//     throw new Error('Incorrect or missing data');
//   }

//   if (
//     'name' in object &&
//     'dateOfBirth' in object &&
//     'gender' in object &&
//     'occupation' in object &&
//     'ssn' in object
//   ) {
//     const newEntry: NewPatientEntry = {
//       name: parseName(object.name),
//       dateOfBirth: parseDateOfBirth(object.dateOfBirth),
//       gender: parseGender(object.gender),
//       occupation: parseOccupation(object.occupation),
//       ssn: parseSsn(object.ssn),
//     };
//     return newEntry;
//   }
//   throw new Error('Incorrect data: some fields are missing');
// };

export default toNewPatientEntry;
