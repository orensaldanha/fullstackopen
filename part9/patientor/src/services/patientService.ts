import patientData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../../types";
import { v1 as uuid } from 'uuid';

const getPatients = () : Array<Patient> => {
    return patientData;
};

const getNonSensitivePatient = () : Array<NonSensitivePatient> => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation
    }));
};

const addPatient = (patient: NewPatient) : Patient => {
    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
        ...patient
    };

    patientData.push(newPatient);

    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatient,
    addPatient
};