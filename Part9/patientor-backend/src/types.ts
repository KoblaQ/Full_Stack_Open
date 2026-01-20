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

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
};

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;
