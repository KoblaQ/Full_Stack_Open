import { z } from 'zod';
import { NewEntrySchema } from './utils';

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

// infer from the schema
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

// export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

// export type NewPatientEntry = Omit<Patient, 'id'>; // REPLACED WITH THE ZOD INFER
