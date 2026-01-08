type Result = string;

interface bmiValues {
  height: number;
  weight: number;
}

const parseArgumentss = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const calculateBmi = (height: number, weight: number): Result => {
  // console.log('height', height)
  // console.log('weight', weight)
  // return 'Normal range'
  const heightInMeters: number = height / 100;

  const bmi: number = weight / (heightInMeters * heightInMeters);
  // console.log('bmi', bmi)
  let bmiMessage = '';

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16.0 && bmi < 17.0) {
    bmiMessage = 'Underweight (Moderate thinness)';
  } else if (bmi >= 17.0 && bmi < 18.5) {
    bmiMessage = 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi < 25.0) {
    bmiMessage = 'Normal range';
  } else if (bmi >= 25.0 && bmi < 30.0) {
    bmiMessage = 'Overweight (Pre-obese)';
  } else if (bmi >= 30.0 && bmi < 35.0) {
    bmiMessage = 'Obese (Class I)';
  } else if (bmi >= 35.0 && bmi < 40.0) {
    bmiMessage = 'Obese (Class II)';
  } else if (bmi >= 40.0) {
    bmiMessage = 'Obese (Class III)';
  } else {
    bmiMessage = 'Something went wrong';
  }

  console.log(bmiMessage);
  return bmiMessage;
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgumentss(process.argv);
    // console.log(calculateBmi(height, weight))
    calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

// console.log(process.argv.length)
