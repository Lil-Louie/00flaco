import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";

import GuessArea from "./pages/GuessArea";
import Header from "./pages/Header";
import Keyboard from "./pages/Keyboard";
import MessageCenter from "./pages/MessageCenter";

import dimensions from "./utils/dimensions";
import boxStyles from "./utils/boxesAndTheirAttributes";
import { useWordLists } from "./utils/useWordLists";

const { keyboardBoxSizes, keyboardFunctionSizes } = dimensions;

function Wordle() {
  const { answer, isValidGuess, loaded, error } = useWordLists();
  const NOT_IN_LIST_MSG = "Not in word list!";


  const demoKeys = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split(""),
  ];
  const demoNumKeys = demoKeys.flat().length;

  const initialKeyBoard = () => {
    return demoKeys.map((row, rowIdx) => {
      let mappedRow = row.map((letter) => ({
        ...boxStyles.keyboardUnusedKey,
        width: keyboardBoxSizes.width,
        letter,
      }));

      if (rowIdx === 2) {
        mappedRow.unshift({
          ...boxStyles.keyboardEnterKey,
          width: keyboardFunctionSizes.width,
          letter: "Enter",
          isEnterKey: true,
        });
        mappedRow.push({
          ...boxStyles.keyboardDeleteKey,
          width: keyboardFunctionSizes.width,
          letter: "Delete",
          isBackspaceKey: true,
        });
      }
      return mappedRow;
    });
  };

  // IMPORTANT: no shared references + ensure letter exists
  const initActiveRow = () =>
    Array.from({ length: dimensions.guessArea.numColumns }, () => ({
      ...boxStyles.blankBox,
      letter: "",
    }));

    

  const [completedRows, setCompletedRows] = useState([]);
  const [activeRow, setActiveRow] = useState(initActiveRow);
  const [activeRowIdx, setActiveRowIdx] = useState(0);
  const [keyboard] = useState(initialKeyBoard);

  const [remainingRows, setRemainingRows] = useState(() =>
    new Array(
      dimensions.guessArea.numColumns * dimensions.guessArea.numRows -
        dimensions.guessArea.numColumns
    ).fill({ ...boxStyles.blankBox, letter: "" })
  );

  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");

  const allRows = [...completedRows, ...activeRow, ...remainingRows];

  useEffect(() => {
    if (won) setMessage("You won!");
    if (lost) setMessage(`You Lost! ${answer}`);
  }, [won, lost, answer]);

  useEffect(() => {
    if (message === NOT_IN_LIST_MSG) {
      setMessage("");
    }
  }, [activeRowIdx]); // runs whenever user types or deletes
  

  if (!loaded) return <div style={{ color: "white" }}>Loading…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const keyboardKeyPressedCallBack = (key) => {
    if (won || lost) return;

    // BACKSPACE
    if (key.isBackspaceKey) {
      if (activeRowIdx === 0) return;

      const newActiveRow = activeRow.slice();
      newActiveRow[activeRowIdx - 1] = { ...boxStyles.blankBox, letter: "" };
      setActiveRow(newActiveRow);
      setActiveRowIdx(activeRowIdx - 1);
      return;
    }

    // ENTER
    if (key.isEnterKey) {
      if (activeRowIdx !== dimensions.guessArea.numColumns) return;

      const guess = activeRow.map((b) => b.letter).join("").toUpperCase();

      // ✅ Option C validation
      if (!isValidGuess(guess)) {
        setMessage("Not in word list!");
        return;
      }

      // evaluate row using daily answer
      const evaluatedRow = activeRow.map((boxAttributes, idx) => {
        const letter = boxAttributes.letter;
        if (letter === answer[idx]) return { ...boxStyles.exactMatch, letter };
        if (answer.includes(letter)) return { ...boxStyles.partialMatch, letter };
        return { ...boxStyles.noMatch, letter };
      });

      setCompletedRows((prev) => [...prev, ...evaluatedRow]);

      // win?
      if (guess === answer) {
        setWon(true);
        setActiveRow([]); // stop input
        return;
      }

      // advance
      setActiveRow(initActiveRow);
      setActiveRowIdx(0);

      setRemainingRows((prev) => {
        const next = prev.slice(0, -dimensions.guessArea.numColumns);
        if (next.length === 0) {
          setLost(true);
          setActiveRow([]); // stop input
        }
        return next;
      });

      return;
    }

    // LETTER
    if (activeRowIdx === dimensions.guessArea.numColumns) return;

    const newActiveRow = activeRow.slice();
    newActiveRow[activeRowIdx] = {
      ...boxStyles.notEvaluated,
      letter: key.letter,
    };
    setActiveRow(newActiveRow);
    setActiveRowIdx(activeRowIdx + 1);

    
  };

  

  return (
    <Fragment>
      <Box
        sx={{
          width: dimensions.width,
          height: dimensions.height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          my: 0,
          gap: 0.5,
        }}
      >
        <Header title={"Wordle"} />
        <GuessArea allRows={allRows} />
        <MessageCenter message={message} />
        <Keyboard
          keyboard={keyboard}
          demoNumKeys={demoNumKeys}
          onClickCallback={keyboardKeyPressedCallBack}
        />
      </Box>
    </Fragment>
  );
}

export default Wordle;
