export const generateRandomNumber = async ( _, res, next ) => {
    try {
        let min = Math.ceil(1);
        let max = Math.floor(6);
        let dice1 = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
        let dice2 = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
        return res.status(200).json({dice1, dice2})
    } catch (error) {
        next(error)
    }
}