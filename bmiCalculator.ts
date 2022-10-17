interface BmiValues {
    weight: number;
    height: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3]),
        };
    } else {
        throw new Error('provided values were not numbers!');
    }
};

const bmiChecker = (weight: number, height: number, printText: string) => {
    const heightInMeters: number = height / 100;
    const bmi: number = weight / (heightInMeters * heightInMeters);
    const rounded: number = Math.round(bmi * 10) / 10;
    console.log(rounded);

    if (rounded <= 18.5) console.log(printText, 'You are underweight.');
    else if (rounded <= 24.9) console.log(printText, 'You are Healthy (normal weight).');
    else if (rounded <= 29.9) console.log(printText, 'You are overweight.');
    else console.log(printText, 'You are obese.');
};

try {
    const { weight, height } = parseBmiArguments(process.argv);
    bmiChecker(weight, height, `Calculated BMI based on a weight of ${weight} and a height of ${height}.`);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
