interface Results {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: 2
  average: number
}

const calculateExercises = (hours: number[], target: number) => {
  const periodLength = hours.length
  const trainingDays = hours.filter((hour) => hour > 0).length
  const average = hours.reduce((a, b) => a + b, 0) / hours.length
  target = target
  const successfulDays = hours.filter((hour) => hour >= target).length
  const success = trainingDays === successfulDays

  let rating = null
  if (successfulDays < 3) {
    rating = 1
  } else if (successfulDays >= 3 && successfulDays < 6) {
    rating = 2
  } else if (successfulDays >= 6) {
    rating = 3
  }

  let ratingDescription = ''

  switch (rating) {
    case 1:
      ratingDescription = 'Poor peformance'
      break
    case 2:
      ratingDescription = 'not too bad but could do better'
      break
    case 3:
      ratingDescription = 'Amazing job'
      break
    default:
      ratingDescription = 'nothing to rate here'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
}
