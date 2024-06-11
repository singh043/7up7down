import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function GuessNumber({ guessedInput, setGuessedInput }) {

  const handleChange = (event) => {
    let value = event.target.value
    setGuessedInput(value);
  };

  return (
    <div>
      <FormControl variant="outlined" sx={{ m: 1, width: "180px" }}>
        <InputLabel id="demo-simple-select-standard-label">Guess the result</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={guessedInput}
          onChange={handleChange}
          label="Guess the result"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"7 Up"}>7 Up</MenuItem>
          <MenuItem value={"Lucky 7"}>Lucky 7</MenuItem>
          <MenuItem value={"7 Down"}>7 Down</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}