import express from 'express';
import { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientData } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

export default router;
