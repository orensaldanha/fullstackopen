import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const { weight, height } = req.query;

    if(!weight || !Number(weight) || !height || !Number(height)) {
        return res.status(400).json({"error": "Missing Query Parmas or Invalid Type of query params"});
    }

    return res.json({
        weight: Number(weight),
        height: Number(height),
        bmi: calculateBmi(Number(weight), Number(height))
    });
});

app.post('/exercise', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).json({"error": "parameters missing"});
    } 

    console.log("after");

    if(isNaN(Number(target))) {
        return res.status(400).json({"error": "malformatted parameters"});
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.json(calculateExercises(daily_exercises, Number(target)));
});

const PORT = 3000;

app.listen(3000, () => {
    console.log(`App running on port ${PORT}`);
});