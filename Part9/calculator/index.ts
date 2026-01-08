import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseValues } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// BMI Calculator API
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);
  // res.send(`Height is ${height} and weight is ${weight}`)

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const response = {
    weight: weight,
    height: height,
    bmi: bmi,
  };
  return res.json(response);
});

// Exercise Calculator API
app.post('/exercises', (req, res) => {
  const { target, daily_exercises } = req.body as ExerciseValues;

  if (!target || !daily_exercises || daily_exercises.length === 0) {
    return res.status(400).send({ error: 'parameters missing' });
  }
  if (
    typeof target !== 'number' ||
    isNaN(target) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    daily_exercises.some(
      (hour: unknown) => typeof hour !== 'number' || isNaN(hour)
    )
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(target, daily_exercises);
  return res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
