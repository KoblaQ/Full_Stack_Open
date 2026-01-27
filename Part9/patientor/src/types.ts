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

export interface Entry {
  // id: string,
  // description: string,
  // creationDate: string,
  // specialistInfo: string,
  // diagnosisCode?: string[]
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: [];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

// export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
