import express, { NextFunction, Response, Request } from 'express';
import patientService from '../services/patientService';
import { Patient, NewPatientEntry, NonSensitivePatientData } from '../types';
import { NewEntrySchema } from '../utils';

import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleWare = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
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
  }
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
