import './App.css';
import { useState, useEffect } from 'react';
import { TextInput, Button } from 'react-native';

export default function Game() {

  const attempts = 6;
  const answer = "HELLO";



  return <div tabIndex={0}>
    <div className="game">
      <div>
        <Board />
      </div>
    </div>
  </div>

}

function Board() {
  const [curGuess, setCurGuess] = useState(Array(0).fill(""));

  useEffect(() => {
    function handleKeyDown(e) {
      const inputKey = e.key;
      console.log(e);
      if (e.code === 'Backspace') {
        console.log("backspace");
        let updatedGuess = [...curGuess.slice(0, -1)];
        console.log(updatedGuess);
        setCurGuess(updatedGuess);

      } else if (isAlpha(inputKey) && inputKey.length === 1 && curGuess.length < 5) {
        let updatedGuess = [...curGuess, e.key.toUpperCase()];
        setCurGuess(updatedGuess);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [curGuess]);

  const validateAnswer = (guess) => guess === "HELLO";
  const handleEnter = () => {
    console.log(curGuess.join(""));

    console.log(validateAnswer(curGuess.join("")));
  }

  return <div>
    <div>
      <Row curGuess={curGuess} />
    </div>
    <button disabled={curGuess.length !== 5} onClick={handleEnter}>BUTTON</button>
  </div >
}

function Row(props) {
  console.log();
  //const [curGuess, setCurGuess] = useState(Array(0).fill(""));



  /*  useEffect(() => {
     function handleKeyDown(e) {
       const inputKey = e.key;
       if (e.code === 'Backspace') {
         let updatedGuess = [...curGuess.slice(0, -1)];
         setCurGuess(updatedGuess);
 
       } else if (isAlpha(inputKey) && inputKey.length === 1 && curGuess.length < 5) {
         let updatedGuess = [...curGuess, e.key.toUpperCase()];
         setCurGuess(updatedGuess);
       }
     }
     document.addEventListener('keydown', handleKeyDown);
     return function cleanup() {
       document.removeEventListener('keydown', handleKeyDown);
     }
   }, [curGuess]);
  */
  return <div>
    {[...Array(5)].map((e, i) => <Square key={i} value={props.curGuess[i]} />)}


  </div>
}

function Square({ value }) {
  return <TextInput
    disabled={true}
    style={{
      fontFamily: "Helvetica Neue",
      borderWidth: 1, borderColor: '#999',
      width: 62,
      height: 62,
      marginRight: 5,
      marginTop: 5,
      padding: 0,
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: 'center'
    }}
    value={value === undefined ? "" : value} />
}

// modified snippet from https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
function isAlpha(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);

    if (!(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};


const square = {
  border: '1px solid rgba(0,0,0,0.5)',
  borderColor: '#999',
  width: 62,
  height: 62,
  margin: '5 0 0 5',
  textAlign: 'center',
  padding: 0


  // fontFamily: "Helvetica Neue", borderWidth: 1, borderColor: '#999', width: 62, height: 62, marginRight: 5, marginTop: 5, padding: 0, fontSize: "2rem", fontWeight: "bold", textAlign: 'center' }};
}

const text = {
  fontWeight: 'bold',
  fontSize: '2em',
  fontFamily: "Helvetica Neue"
}