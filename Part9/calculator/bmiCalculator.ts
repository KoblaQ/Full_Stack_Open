type Result = string

const calculateBmi = (height: number, weight: number): Result => {
  console.log('height', height)
  console.log('weight', weight)
  // return 'Normal range'
  const heightInMeters: number = height / 100

  const bmi: number = weight / (heightInMeters * heightInMeters)
  console.log('bmi', bmi)

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)'
  } else if (bmi >= 16.0 && bmi < 17.0) {
    return 'Underweight (Moderate thinness)'
  } else if (bmi >= 17.0 && bmi < 18.5) {
    return 'Underweight (Mild thinness)'
  } else if (bmi >= 18.5 && bmi < 25.0) {
    return 'Normal range'
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return 'Overweight (Pre-obese)'
  } else if (bmi >= 30.0 && bmi < 35.0) {
    return 'Obese (Class I)'
  } else if (bmi >= 35.0 && bmi < 40.0) {
    return 'Obese (Class II)'
  } else if (bmi >= 40.0) {
    return 'Obese (Class III)'
  } else {
    return 'Something went wrong'
  }
}

try {
  console.log(calculateBmi(180, 74))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
}
