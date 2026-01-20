export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
};

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;
