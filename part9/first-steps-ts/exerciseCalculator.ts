interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (daily_exercise: Array<number>, target: number): Result => {
    const result: Result = {
        periodLength: daily_exercise.length,
        trainingDays: 0,
        success: true,
        rating: 0,
        ratingDescription: "",
        target: target,
        average: 0
    };

    let sum = 0;
    let trainingDaysCount = 0;
    daily_exercise.forEach((hours) => {
        sum += hours;

        if(hours !== 0) {
            trainingDaysCount++;
        } 
    });
    result.trainingDays = trainingDaysCount;
    result.average = sum / result.periodLength;

    return result;
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));