/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitivePatient());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    res.json(patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    }));
});

export default router;