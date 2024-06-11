import './App.css';
import axios from "axios";
import { useState } from 'react';
import Dice from './components/dice/Dice';
import { Button } from '@mui/material';
import GuessNumber from './components/guessNumber/guessNumber';
import Alert from '@mui/material/Alert';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

function App() {

  const [bet, setBet] = useState(null);
  const [points, setPoints] = useState(5000);
  const [guessResult, setGuessResult] = useState("");
  const [guessedInput, setGuessedInput] = useState("");
  const [diceNumber1, setDiceNumber1] = useState(null);
  const [diceNumber2, setDiceNumber2] = useState(null);
  
  const generateDiceNumber = async () => {
    try {
      console.clear();
      const res = await axios.get('/api/diceNumber')
      setDiceNumber1(res.data.dice1)
      setDiceNumber2(res.data.dice2)
      setTimeout(() => {
        checkResult(res?.data?.dice1, res?.data?.dice2, guessedInput);
      }, 500)
    } catch (error) {
      console.log("Error", error?.message);
    }
  }

  const checkResult = async ( diceNumber1, diceNumber2, guessedInput ) => {
    try {
      const res = await axios.post('/api/checkGuess', { diceNumber1, diceNumber2, guessedInput });
      setGuessResult(res?.data);
      pointsCalculation(points, bet, guessedInput, guessResult)
    } catch (error) {
      console.log("Error", error?.message)
    }
  }

  const pointsCalculation = async (points, bet, guessedInput, guessResult) => {
    try {
      const res = await axios.post('/api/calculatePoints', { totalPoints: points, betAmount: bet, guessResult, guessedInput });
      setPoints(res.data)
    } catch (error) {
      console.log("Error", error?.message);
    }
  }

  return (
    <div className='App'>
      <div>Points: {points}</div>
      <div>Bet: {!bet ? "Select a bet" : bet}</div>
      <div className='dice'>
      {
        diceNumber1 && diceNumber2 ? (
          <>
            <Dice diceNumber={diceNumber1} />
            <Dice diceNumber={diceNumber2} />
          </>
        ) : (
          <>
            <Dice diceNumber={diceNumber1} />
            <Dice diceNumber={diceNumber2} />
          </>
        )
      }
      </div>
      <GuessNumber guessedInput={guessedInput} setGuessedInput={setGuessedInput} />
      <Button variant="contained"
        onClick={() => {
          generateDiceNumber();
        }}
        disabled={!bet || guessedInput === "" || points === 0}
      >
        Roll Die
      </Button>
      <div className='bet'>
        <Button variant="contained"
          sx={{ backgroundColor: 'green', ":hover": {backgroundColor: "green"} }}
          onClick={() => setBet(100)}
        >
          100
        </Button>
        <Button variant="contained"
          sx={{ backgroundColor: 'green', ":hover": {backgroundColor: "green"} }}
          onClick={() => setBet(200)}
        >
          200
        </Button>
        <Button variant="contained"
          sx={{ backgroundColor: 'green', ":hover": {backgroundColor: "green"} }}
          onClick={() => setBet(500)}
        >
          500
        </Button>
      </div>
      {
        guessResult ? 
          guessResult === "You won" ?
            <Alert severity="success" icon={<SentimentVerySatisfiedIcon />}>{`${guessResult}. Try luck again?`}</Alert>
            :
            <Alert severity="success" icon={<SentimentVeryDissatisfiedIcon />}>{`${guessResult}. Try again?`}</Alert>
          :
          points === 0 ?
            <Alert severity="success" icon={<SentimentVeryDissatisfiedIcon />}>You dont have enough points. Come back after 24 hours to get free 100 points.</Alert>
            :
            <Alert severity="success" icon={<false />}>Roll the dice to play the game</Alert>
      }
    </div>
  )
}

export default App
