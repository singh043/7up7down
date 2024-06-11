import './App.css';
import axios from "axios";
import { useState } from 'react';
import Dice from './components/dice/Dice';
import { Button } from '@mui/material';
import GuessNumber from './components/guessNumber/guessNumber';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

function App() {

  const [bet, setBet] = useState(null);
  const [points, setPoints] = useState(5000);
  const [guessResult, setGuessResult] = useState("");
  const [guessedInput, setGuessedInput] = useState("");
  const [diceNumber1, setDiceNumber1] = useState(null);
  const [diceNumber2, setDiceNumber2] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const generateDiceNumber = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/diceNumber')
      setDiceNumber1(res.data.dice1)
      setDiceNumber2(res.data.dice2)
      setTimeout(() => {
        checkResult(res?.data?.dice1, res?.data?.dice2, guessedInput);
      }, 500)
    } catch (error) {
      setLoading(false)
      console.log("Error", error?.message);
    }
  }

  const checkResult = async ( diceNumber1, diceNumber2, guessedInput ) => {
    try {
      const res = await axios.post('/api/checkGuess', { diceNumber1, diceNumber2, guessedInput });
      setGuessResult(res?.data);
      pointsCalculation(points, bet, guessedInput, res?.data)
    } catch (error) {
      setLoading(false)
      console.log("Error", error?.message)
    }
  }

  const pointsCalculation = async (points, bet, guessedInput, guessResult) => {
    try {
      const res = await axios.post('/api/calculatePoints', { totalPoints: points, betAmount: bet, guessResult, guessedInput });
      setPoints(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
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
          setBet(null)
          setGuessResult("")
        }}
        disabled={!bet || guessedInput === "" || points === 0 || loading}
        className={`${loading ? "loading" : ""} roll-btn`}
      >
        {loading ? <CircularProgress size={16} /> : null}
        <span>Roll Die</span>
      </Button>
      <div className='bet'>
        <Button variant="contained"
          sx={{ backgroundColor: 'green', ":hover": {backgroundColor: "green"} }}
          onClick={() => setBet(100)}
          disabled={points < 100}
        >
          100
        </Button>
        <Button variant="contained"
          sx={{ backgroundColor: 'green', ":hover": {backgroundColor: "green"} }}
          onClick={() => setBet(200)}
          disabled={points < 200}
        >
          200
        </Button>
        <Button variant="contained"
          sx={{ backgroundColor: 'green', ":hover": {backgroundColor: "green"} }}
          onClick={() => setBet(500)}
          disabled = {points < 500}
        >
          500
        </Button>
      </div>
      <div className='result-text'>
        {
          loading ? 
            <span><CircularProgress size={16} sx={{color: "white"}} />Loading ...</span>
          :
            points === 0 ?
              <span><SentimentVeryDissatisfiedIcon />You do not have enough points. Come back after 24 hour to get free 100 points.</span>
              :
              guessResult ?
              guessResult === "You won" ?
                <span><SentimentVerySatisfiedIcon />You won. Try your luck again?</span>
              :
                <span><SentimentVeryDissatisfiedIcon />You lost. Try again?</span>
              :
                <span>Roll the dice to play the game.</span>

        }
      </div>
    </div>
  )
}

export default App
