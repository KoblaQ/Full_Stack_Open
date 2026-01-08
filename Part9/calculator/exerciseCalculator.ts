interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseValues {
  target: number;
  daily_exercises: number[];
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  // if (args.length > 4) throw new Error('Too many arguments')

  const daily_exercises = args.slice(3).map(Number); // Slice from index 3 to get all exercise hours
  // console.log(hours)

  if (
    !isNaN(Number(args[2])) &&
    daily_exercises.every((hour) => !isNaN(hour))
  ) {
    return {
      target: Number(args[2]),
      daily_exercises: daily_exercises.map((hour) => Number(hour)),
    };
  } else {
    throw new Error('Provided values were not all numbers!');
  }
};

export const calculateExercises = (
  targetHours: number,
  daily_exercises: number[]
): Results => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((hour) => hour > 0).length;
  const average =
    daily_exercises.reduce((a, b) => a + b, 0) / daily_exercises.length;
  const target = targetHours;
  const successfulDays = daily_exercises.filter(
    (hour) => hour >= target
  ).length;
  const success = trainingDays === successfulDays;

  let rating = 0;
  if (successfulDays < 3) {
    rating = 1;
  } else if (successfulDays >= 3 && successfulDays < 6) {
    rating = 2;
  } else if (successfulDays >= 6) {
    rating = 3;
  }

  let ratingDescription = '';

  switch (rating) {
    case 1:
      ratingDescription = 'Poor peformance';
      break;
    case 2:
      ratingDescription = 'not too bad but could do better';
      break;
    case 3:
      ratingDescription = 'Amazing job';
      break;
    default:
      ratingDescription = 'nothing to rate here';
  }

  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  console.log(result);
  return result;
};

if (require.main === module) {
  try {
    // console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
    const { target, daily_exercises: daily_exercises } = parseArguments(
      process.argv
    );
    calculateExercises(target, daily_exercises);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
