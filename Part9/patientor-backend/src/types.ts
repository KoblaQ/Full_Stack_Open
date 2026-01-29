import { z } from 'zod';
import {
  NewEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
} from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface Entry {}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  // diagnosisCodes?: string[];
  // diagnosisCode?: Diagnosis['code'][];
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

// export enum EntryType {
//   Hospital = HospitalEntry,
//   OccupationalHealthcare = 'OccupationalHealthcare',
//   HealthCheck = 'HealthCheck',
// }

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

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
export type NewHospitalEntries = z.infer<typeof HospitalEntrySchema>;
export type NewOccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;
export type NewHealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

// Union of all entries
export type NewEntries =
  | NewHealthCheckEntry
  | NewOccupationalHealthcareEntry
  | NewHospitalEntries;

// export type NonSensitivePatientData = Omit<Patient, 'ssn'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

// export type NewPatientEntry = Omit<Patient, 'id'>; // REPLACED WITH THE ZOD INFER
// export type EntryWithoutId = Omit<Entry, 'id'>;

// export type EntryWithoutId = UnionOmit<Entry, 'id'>;
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
