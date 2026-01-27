// import axios from 'axios';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Patient, Diagnosis } from '../../types';

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
        <div key={entry.id}>
          <p>
            {entry.date} {entry.description}
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
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
