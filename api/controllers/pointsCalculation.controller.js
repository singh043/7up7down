import { errorHandler } from './../utils/error.js';

export const pointsCalculation = async ( req, res, next ) => {

    let { totalPoints, betAmount, guessResult, guessedInput } = req.body;

    totalPoints = Number(totalPoints);
    betAmount = Number(betAmount);

    if (!totalPoints || !betAmount || !guessResult || !guessedInput) {
        return next(errorHandler(404, "Guess result, total points and bet amount all are required"))
    }

    try {
        let finalPoints;
        if (guessResult === "You won") {
            if (guessedInput === "Lucky 7") {
                finalPoints = totalPoints + betAmount * 5;
            } else {
                finalPoints = totalPoints + betAmount * 2;
            }
        } else {
            finalPoints = totalPoints - betAmount;
        }
        return res.status(200).json(finalPoints)
    } catch (error) {
        next(error)
    }
}