import { errorHandler } from './../utils/error.js';

export const checkResult = async ( req, res, next ) => {

    const { diceNumber1, diceNumber2, guessedInput } = req.body;

    if (!diceNumber1 || !diceNumber2 || !guessedInput || guessedInput.trim() === "") {
        return next(errorHandler(404, "Guessed input, dice1 and dice2 numbers are required"))
    }

    try {
        let diceNumbers = parseInt(diceNumber1) + parseInt(diceNumber2);
        let result = "";
        if (diceNumbers === 7 && guessedInput === "Lucky 7") {
            result = "You won"
        } else if (diceNumbers < 7 && guessedInput === "7 Down") {
            result = "You won"
        } else if (diceNumbers > 7 && guessedInput === "7 Up") {
          result = "You won"
        } else {
          result = "You lost"
        }

        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}