// import axios from 'axios';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, yellow } from '@mui/material/colors';

import {
  Patient,
  Diagnosis,
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from '../../types';

const detailsStyle = {
  // paddingTop: 1,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  borderRadius: '15px',
};

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[] | null;
}
const Hospital = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <div style={detailsStyle}>
      <div key={entry.id}>
        <p>
          {entry.date} <LocalHospitalIcon />
        </p>
        <p>
          <em>{entry.description}</em>
        </p>
        <ul>
          {entry.diagnosisCodes?.map((code) => {
            const diagnosis = diagnoses?.find((d) => d.code === code);
            // console.log(diagnosis);
            return (
              <li key={code}>
                {code} {diagnosis ? diagnosis.name : ''}
              </li>
            );
          })}
        </ul>
        <p>diacharge: {entry.discharge.date}</p>
        <p>
          <em>{entry.discharge.criteria}</em>
        </p>
        <p>diagnose by {entry.specialist}</p>
      </div>
    </div>
  );
};

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[] | null;
}

const OccupationalHealthcare = ({
  entry,
  diagnoses,
}: OccupationalHealthcareEntryProps) => {
  return (
    <div style={detailsStyle}>
      <div key={entry.id}>
        <p>
          {entry.date} <WorkIcon /> <em>{entry.employerName}</em>
        </p>
        <p>
          <em>{entry.description}</em>
        </p>
        <ul>
          {entry.diagnosisCodes?.map((code) => {
            const diagnosis = diagnoses?.find((d) => d.code === code);
            // console.log(diagnosis);
            return (
              <li key={code}>
                {code} {diagnosis ? diagnosis.name : ''}
              </li>
            );
          })}
        </ul>
        {entry.sickLeave && (
          <div>
            <p>Sick Leave</p>
            <p>Start date: {entry.sickLeave.startDate}</p>
            <p>End date: {entry.sickLeave.startDate}</p>
          </div>
        )}

        <p>diagnose by {entry.specialist}</p>
      </div>
    </div>
  );
};

interface HealthCheckProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[] | null;
}
const HealthCheck = ({ entry, diagnoses }: HealthCheckProps) => {
  if (entry.type != 'HealthCheck') {
    return null;
  }
  const iconColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return green[500];
      case 1:
        return yellow[500];
      default:
        return undefined;
    }
  };
  return (
    <div style={detailsStyle}>
      <div key={entry.id}>
        <p>
          {entry.date} <MedicalServicesIcon />
        </p>
        <p>
          <em>{entry.description}</em>
        </p>
        <FavoriteIcon sx={{ color: iconColor() }} />
        <p> diagnose by {entry.specialist}</p>
        <ul>
          {entry.diagnosisCodes?.map((code) => {
            const diagnosis = diagnoses?.find((d) => d.code === code);
            // console.log(diagnosis);
            return (
              <li key={code}>
                {code} {diagnosis ? diagnosis.name : ''}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

interface EntryProps {
  entry: Entry;
  key: string;
  diagnoses: Diagnosis[] | null;
}

const EntryDetails: React.FC<EntryProps> = ({
  entry,
  diagnoses,
}: EntryProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const id = useParams().id;

  // Get the patient
  useEffect(() => {
    if (id) {
      patientService.getById(id).then(setPatient);
    }
  }, [id]);

  // Get the diagnoses
  useEffect(() => {
    diagnosisService.getAll().then(setDiagnoses);
  }, []);
  // console.log(diagnoses);

  // console.log(patient);
  return (
    <div>
      <h3>
        {patient?.name}{' '}
        {patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h3>
      <p>ssh: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>

      {patient?.entries && patient?.entries.length > 0 && <h3>entries</h3>}
      {patient?.entries.map((entry) => (
        <EntryDetails entry={entry} key={entry.id} diagnoses={diagnoses} />
      ))}
      <Button variant="contained">Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
