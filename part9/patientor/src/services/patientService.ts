import patientData from "../../data/patients";
import { Patient, NonSensitivePatient } from "../../types";

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

export default {
    getPatients,
    getNonSensitivePatient
};