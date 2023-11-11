import './App.css';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native';

export default function Game() {

  const [curAttempt, setCurAttempt] = useState(0);
  const [inputOn, setInputOn] = useState(true);


  return <div tabIndex={0}>
    <div className="game">
      <div><h1>WORDLE</h1></div>
      <div>
        <Board curAttempt={curAttempt} setCurAttempt={setCurAttempt} inputOn={inputOn} setInputOn={setInputOn} />
      </div>
    </div>
  </div>

}

function Board(props) {

  const [curRow0, setCurRow0] = useState(Array(0).fill(""));
  const [curRow1, setCurRow1] = useState(Array(0).fill(""));
  const [curRow2, setCurRow2] = useState(Array(0).fill(""));
  const [curRow3, setCurRow3] = useState(Array(0).fill(""));
  const [curRow4, setCurRow4] = useState(Array(0).fill(""));
  const [curRow5, setCurRow5] = useState(Array(0).fill(""));

  const [curRow0Color, setCurRow0Color] = useState(Array(5).fill("white"));
  const [curRow1Color, setCurRow1Color] = useState(Array(5).fill("white"));
  const [curRow2Color, setCurRow2Color] = useState(Array(5).fill("white"));
  const [curRow3Color, setCurRow3Color] = useState(Array(5).fill("white"));
  const [curRow4Color, setCurRow4Color] = useState(Array(5).fill("white"));
  const [curRow5Color, setCurRow5Color] = useState(Array(5).fill("white"));

  const validateAnswerSimple = (row) => {
    return row.join("") === "HELLO";
  };

  const handleEnter = () => {
    console.log("handleEnter()");
    if (props.curAttempt < 6) {
      if ((props.curAttempt === 0 && curRow0.length === 5)) {
        if (!validateAnswerSimple(curRow0)) {
          setCurRow0Color(Array(5).fill("gray"));
          props.setCurAttempt(props.curAttempt + 1);
        } else {
          setCurRow0Color(Array(5).fill("green"));
          props.setInputOn(false);

        }
      } else if (props.curAttempt === 1 && curRow1.length === 5) {
        if (!validateAnswerSimple(curRow1)) {
          setCurRow1Color(Array(5).fill("gray"));
          props.setCurAttempt(props.curAttempt + 1);
        } else {
          setCurRow1Color(Array(5).fill("green"));
          props.setInputOn(false);

        }
      } else if (props.curAttempt === 2 && curRow2.length === 5) {
        if (!validateAnswerSimple(curRow2)) {
          setCurRow2Color(Array(5).fill("gray"));
          props.setCurAttempt(props.curAttempt + 1);
        } else {
          setCurRow2Color(Array(5).fill("green"));
          props.setInputOn(false);

        }
      } else if (props.curAttempt === 3 && curRow3.length === 5) {
        if (!validateAnswerSimple(curRow3)) {
          setCurRow3Color(Array(5).fill("gray"));
          props.setCurAttempt(props.curAttempt + 1);
        } else {
          setCurRow3Color(Array(5).fill("green"));
          props.setInputOn(false);

        }
      } else if (props.curAttempt === 4 && curRow4.length === 5) {
        if (!validateAnswerSimple(curRow4)) {
          setCurRow4Color(Array(5).fill("gray"));
          props.setCurAttempt(props.curAttempt + 1);
        } else {
          setCurRow4Color(Array(5).fill("green"));
          props.setInputOn(false);

        }
      } else if (props.curAttempt === 5 && curRow5.length === 5) {
        if (!validateAnswerSimple(curRow5)) {
          setCurRow5Color(Array(5).fill("gray"));
          props.setCurAttempt(props.curAttempt + 1);
        } else {
          setCurRow5Color(Array(5).fill("green"));
          props.setInputOn(false);
        }
      }
    }
  }

  return <div>
    <div>
      <Row rowIndex={0} curGuess={curRow0} setCurGuess={setCurRow0} curAttempt={props.curAttempt} backgroundColor={curRow0Color} inputOn={props.inputOn} />
      <Row rowIndex={1} curGuess={curRow1} setCurGuess={setCurRow1} curAttempt={props.curAttempt} backgroundColor={curRow1Color} inputOn={props.inputOn} />
      <Row rowIndex={2} curGuess={curRow2} setCurGuess={setCurRow2} curAttempt={props.curAttempt} backgroundColor={curRow2Color} inputOn={props.inputOn} />
      <Row rowIndex={3} curGuess={curRow3} setCurGuess={setCurRow3} curAttempt={props.curAttempt} backgroundColor={curRow3Color} inputOn={props.inputOn} />
      <Row rowIndex={4} curGuess={curRow4} setCurGuess={setCurRow4} curAttempt={props.curAttempt} backgroundColor={curRow4Color} inputOn={props.inputOn} />
      <Row rowIndex={5} curGuess={curRow5} setCurGuess={setCurRow5} curAttempt={props.curAttempt} backgroundColor={curRow5Color} inputOn={props.inputOn} />

      <div><p></p></div>
    </div>
    <button onClick={handleEnter}>ENTER</button>
  </div >
}

function Row(props) {

  useEffect(() => {
    function handleKeyDown(e) {

      if (props.rowIndex === props.curAttempt & props.inputOn) {
        console.log("ATTEMPT " + props.curAttempt)

        const inputKey = e.key;
        if (e.code === 'Backspace') {
          let updatedGuess = [...props.curGuess.slice(0, -1)];
          props.setCurGuess(updatedGuess);

        } else if (isAlpha(inputKey) && inputKey.length === 1 && props.curGuess.length < 5) {
          let updatedGuess = [...props.curGuess, e.key.toUpperCase()];
          props.setCurGuess(updatedGuess);
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [props]);

  return <div>
    {[...Array(5)].map((e, i) => <Square key={i} value={props.curGuess[i]} backgroundColor={props.backgroundColor[i]} />)}
  </div>
}
function Square({ backgroundColor, value }) {
  return <TextInput
    disabled={true}
    style={{
      backgroundColor: backgroundColor,
      color: backgroundColor === "white" ? "black" : "white",
      fontFamily: "Helvetica Neue",
      borderWidth: 1,
      borderColor: '#999',
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