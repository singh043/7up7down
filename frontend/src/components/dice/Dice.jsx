import './Dice.css';
import React from 'react';
import { QuestionMark } from '@mui/icons-material';


const Dice = ({ diceNumber }) => {

    let p;

    switch (diceNumber) {
        case 1:
            p = (
                <div className='face face-1'>
                    <div className="dot"></div>
                </div>        
            )
            break;
        case 2:
            p = (
                <div className='face face-2'>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>         
            )
            break;
        case 3:
            p = (
                <div className='face face-3'>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>        
            )
            break;
        case 4:
            p = (
                <div className='face face-4'>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>        
            )
            break;
        case 5:
            p = (
                <div className='face face-5'>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>     
            )
            break;
        case 6:
            p = (
                <div className='face face-6'>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>     
            )
            break;
        default:
            p = (
                <div className='face'>
                    <QuestionMark sx={{ color: 'black', fontSize: '40px' }} />
                </div>     
            )
    }

    return (
        <>
            {
                p
            }
        </>
    );
};

export default Dice;
