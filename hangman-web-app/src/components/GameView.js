import React, {useState, useEffect} from 'react';

function Word({revealedWord}) {
    const wordWithSpaces = revealedWord.split('').join(' ');
    return <p>{wordWithSpaces}</p>;
}

function GuessDisplay({game, guessResult}) {
    return (
        <div>
            <p>Guesses Remaining: {game.numFailedGuessesRemaining}</p>
            <p>{guessResult.error ? guessResult.error : ""}</p>
        </div>
    )
}

function GuessInput({onLetterUpdated, onGuess, onUndo}) {
    const [letter, setLetter] = useState('');

    useEffect(() => {
        if (typeof onLetterUpdated === 'function') {
            onLetterUpdated();
        }
    }, [letter]);

    function submitGuess() {
        setLetter('');
        if (typeof onGuess === 'function') {
            onGuess(letter)
        }
    }

    function onKeyPress(ev) {
        if (ev.key === 'Enter') {
            submitGuess();
        }
    }

    function executeUndo() {
        if (typeof onUndo === 'function') {
            onUndo()
        }
    }

    return (
        <div>
            <input
                type="text"
                value={letter}
                autoFocus
                onChange={e => setLetter(e.target.value)}
                onKeyPress={e => onKeyPress(e)}
            />
            <button
                type="button"
                onClick={() => submitGuess()}
            >
                Guess
            </button>
            <button
                type="button"
                onClick={() => executeUndo()}
            >
                Undo
            </button>
        </div>
    )
}


export default function GameView({game, guessResult, onLetterUpdated, onGuess, onUndo}) {
    return (
        <div>
            <Word revealedWord={game.revealedWord}/>
            <GuessDisplay game={game} guessResult={guessResult}/>
            <GuessInput onLetterUpdated={onLetterUpdated} onGuess={onGuess} onUndo={onUndo}/>
            {/*<GuessUndo onGuessUndo={onGuessUndo} />*/}
        </div>
    );
}
