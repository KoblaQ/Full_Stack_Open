import express, { NextFunction, Response, Request } from 'express';
import patientService from '../services/patientService';
import {
  Patient,
  NewPatientEntry,
  NonSensitivePatient,
  NewEntries,
  EntryWithoutId,
} from '../types';
import { NewEntrySchema, toNewEntry } from '../utils';

import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req, res: Response<Patient | undefined>) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntriesParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    toNewEntry(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleWare = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

// For ZOD
router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  },
);

router.post(
  '/:id/entries',
  newEntriesParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<NewEntries>,
  ) => {
    const addedEntries = patientService.addEntries(req.params.id, req.body);
    res.json(addedEntries);
  },
);

router.use(errorMiddleWare);
// router.post('/', (req, res) => {
//   try {
//     const newPatientEntry = toNewPatientEntry(req.body);
//     const addedEntry = patientService.addPatient(newPatientEntry);

//     res.json(addedEntry);
//   } catch (error: unknown) {
//     let errorMessage = 'Something went wrong. ';
//     if (error instanceof Error) {
//       errorMessage += 'Error: ' + error.message;
//     }
//     res.status(400).send(errorMessage);
//   }
// });

export default router;
