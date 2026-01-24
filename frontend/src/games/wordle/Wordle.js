import React from "react";
import { useEffect, useState } from "react";
import GuessArea from "./pages/GuessArea";
import Keyboard from "./pages/Keyboard";
import MessageCenter from "./pages/MessageCenter";

import dimensions from "./utils/dimensions";
import boxStyles from "./utils/boxesAndTheirAttributes";
import { useWordLists } from "./utils/useWordLists";

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
        letter,
      }));
  
      if (rowIdx === 2) {
        mappedRow.unshift({
          ...boxStyles.keyboardEnterKey,
          letter: "Enter",
          isEnterKey: true,
        });
        mappedRow.push({
          ...boxStyles.keyboardDeleteKey,
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
    Array.from(
      {
        length:
          dimensions.guessArea.numColumns * dimensions.guessArea.numRows -
          dimensions.guessArea.numColumns,
      },
      () => ({ ...boxStyles.blankBox, letter: "" })
    )
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
  }, [activeRowIdx, message]); // runs whenever user types or deletes
  

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
      <div className="mx-auto w-full max-w-[600px] h-[100dvh] flex flex-col overflow-hidden px-2 m-0">
        {/* Board area grows to take remaining space */}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <GuessArea allRows={allRows} />
        </div>

        <div className="shrink-0">
          <MessageCenter message={message} />
        </div>

        {/* Keyboard pinned at bottom */}
        <div className="mt-auto shrink-0 pb-[env(safe-area-inset-bottom)]">
          <Keyboard
            keyboard={keyboard}
            demoNumKeys={demoNumKeys}
            onClickCallback={keyboardKeyPressedCallBack}
        />
        </div>
      </div>

  );
}

export default Wordle;
