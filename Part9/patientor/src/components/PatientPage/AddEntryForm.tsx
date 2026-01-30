import { useState, SyntheticEvent, SetStateAction, Dispatch } from 'react';
import patientService from '../../services/patients';
import { EntryWithoutId, Patient } from '../../types';
import {
  Button,
  Box,
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
} from '@mui/material';
import { red, green } from '@mui/material/colors';
import axios from 'axios';

interface Props {
  handleToggleVisibility: () => void;
  id: string | undefined;
  setPatient: Dispatch<SetStateAction<Patient | null>>;
  patient: Patient | null;
}

enum EntryType {
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
}

interface EntryOption {
  value: EntryType;
  label: string;
}
const entryOptions: EntryOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({
  id,
  handleToggleVisibility,
  patient,
  setPatient,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const [discharge, setDischarge] = useState({ date: '', criteria: '' });
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: '' });
  const [errorMessage, setErrorMessage] = useState<string>();

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(EntryType).find((t) => t.toString() === value);

      if (type) {
        setType(type);
      }
    }
  };

  const submitNewEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntriesObject = {
      description,
      date,
      specialist,
      type,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(',').map((code) => code.trim())
        : undefined,
    };
    let entriesObject: EntryWithoutId | undefined;

    // const assertNever = (value: never): never => {
    //   throw new Error(
    //     `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    //   );
    // };
    switch (type) {
      case 'HealthCheck':
        entriesObject = {
          ...baseEntriesObject,
          type: 'HealthCheck',
          healthCheckRating: Number(healthCheckRating),
        };
        break;
      case 'Hospital':
        entriesObject = {
          ...baseEntriesObject,
          type: 'Hospital',
          discharge: { date: discharge.date, criteria: discharge.criteria },
        };
        break;
      case 'OccupationalHealthcare':
        entriesObject = {
          ...baseEntriesObject,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave: {
            startDate: sickLeave.startDate,
            endDate: sickLeave.endDate,
          },
        };
        break;
      default:
        return null;
    }

    try {
      if (entriesObject && id) {
        const entry = await patientService.addEntry(id, entriesObject);

        if (patient) {
          setPatient({
            ...patient,
            entries: [...patient.entries.concat(entry)],
          });
        }

        // console.log(entry);
        // console.log(patient);

        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating('');
        setDiagnosisCodes('');
        setType(EntryType.HealthCheck); // Sets HealthCheck as default
        handleToggleVisibility();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // console.log(error);
        // console.log(error?.response?.data?.error[0]?.message);
        const errorPath = error.response?.data?.error[0];
        const message = `Value of ${errorPath.path[0]}: ${errorPath.message}`;

        setErrorMessage(message);
      }
      // console.log(errorMessage);
    }
  };
  return (
    <Box sx={{ border: 'dotted', padding: 1, borderRadius: 2 }}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {/* <div style={detailsStyle}> */}
      <h4>New Healthcheck entry</h4>
      <form onSubmit={submitNewEntry}>
        <div>
          <div>
            <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
            <Select
              label="EntryType"
              fullWidth
              value={type}
              onChange={onTypeChange}
            >
              {entryOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              sx={{ padding: 1 }}
              onChange={({ target }) => setDescription(target.value)}
            />

            <TextField
              label="Date"
              variant="outlined"
              fullWidth
              sx={{ padding: 1 }}
              onChange={({ target }) => setDate(target.value)}
            />

            <TextField
              label="Specialist"
              variant="outlined"
              fullWidth
              sx={{ padding: 1 }}
              onChange={({ target }) => setSpecialist(target.value)}
            />

            <TextField
              label="Diagnosis codes"
              variant="outlined"
              fullWidth
              sx={{ padding: 1 }}
              onChange={({ target }) => setDiagnosisCodes(target.value)}
            />

            {type === 'HealthCheck' && (
              <TextField
                label="Healthcheck rating"
                variant="outlined"
                fullWidth
                sx={{ padding: 1 }}
                onChange={({ target }) => setHealthCheckRating(target.value)}
              />
            )}

            {type === 'OccupationalHealthcare' && (
              <div>
                <TextField
                  label="Employer Name"
                  variant="outlined"
                  fullWidth
                  sx={{ padding: 1 }}
                  onChange={({ target }) => setEmployerName(target.value)}
                />
                <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
                <TextField
                  label="Start Date"
                  variant="outlined"
                  fullWidth
                  sx={{ padding: 1 }}
                  onChange={({ target }) =>
                    setSickLeave({ ...sickLeave, startDate: target.value })
                  }
                />
                <TextField
                  label="End Date"
                  variant="outlined"
                  fullWidth
                  sx={{ padding: 1 }}
                  onChange={({ target }) =>
                    setSickLeave({ ...sickLeave, endDate: target.value })
                  }
                />
              </div>
            )}

            {type === 'Hospital' && (
              <div>
                <InputLabel>Discharge</InputLabel>

                <TextField
                  label="Date"
                  variant="outlined"
                  fullWidth
                  sx={{ padding: 1 }}
                  onChange={({ target }) =>
                    setDischarge({ ...discharge, date: target.value })
                  }
                />
                <TextField
                  label="Criteria"
                  variant="outlined"
                  fullWidth
                  sx={{ padding: 1 }}
                  onChange={({ target }) =>
                    setDischarge({ ...discharge, criteria: target.value })
                  }
                />
              </div>
            )}
          </div>

          <Grid container justifyContent={'space-between'}>
            <Grid item>
              <Button
                variant="contained"
                sx={{ backgroundColor: red[500] }}
                onClick={handleToggleVisibility}
                style={{ float: 'left' }}
                type="button"
              >
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                sx={{ backgroundColor: green[500] }}
                // onClick={addEntry}
                style={{ float: 'right' }}
                type="submit"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
      {/* </div> */}
    </Box>
  );
};

export default AddEntryForm;
