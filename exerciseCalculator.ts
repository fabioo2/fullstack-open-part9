interface ExerciseValues {
    targetValue: number;
    exerciseValues: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const parsedArgs: Array<number> = args.slice(2).map(Number);
    console.log(parsedArgs);
    const isAllNumbers: Boolean = parsedArgs.every((element) => !isNaN(element));
    if (isAllNumbers) {
        return {
            targetValue: parsedArgs[0],
            exerciseValues: parsedArgs.slice(1),
        };
    } else {
        throw new Error('provided values were not numbers!');
    }
};

interface ExerciseTypes {
    periodLength: number;
    success: boolean;
    rating: null | 1 | 2 | 3;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercise = (target: number, exerciseValues: Array<number>): ExerciseTypes => {
    const periodLength: number = exerciseValues.filter((val) => val !== 0).length;
    const success: boolean = periodLength >= target ? true : false;
    let rating: null | 1 | 2 | 3 = null;
    if (periodLength < target) rating = 1;
    else if (periodLength === target) rating = 2;
    else rating = 3;

    let ratingDescription: string;

    if (rating === 1) ratingDescription = 'You really failed this period. Try much harder';
    else if (rating === 2) ratingDescription = 'You did it, barely...';
    else ratingDescription = 'You exceeded your goals! Great job!';

    const totalHours: number = exerciseValues.reduce((partialSum, a) => partialSum + a, 0);

    const exerciseObject = {
        periodLength: periodLength,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: totalHours / exerciseValues.length,
    };
    return exerciseObject;
};

try {
    const { targetValue, exerciseValues } = parseExerciseArguments(process.argv);
    console.log(targetValue, exerciseValues);
    console.log(calculateExercise(targetValue, exerciseValues));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
