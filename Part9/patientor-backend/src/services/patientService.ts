import patients from '../../data/patients';

import {
  NonSensitivePatient,
  NewPatientEntry,
  Patient,
  NewEntries,
  Entry,
  EntryWithoutId,
} from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatientData = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }: Patient) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((patient: Patient) => patient.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntries = (id: string, entries: EntryWithoutId): NewEntries => {
  const patientToUpdate = patients.find(
    (patient: Patient) => patient.id === id,
  );

  const newEntry: Entry = {
    id: uuid(),
    ...entries,
  };
  patientToUpdate?.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatientData,
  addPatient,
  findById,
  addEntries,
};
