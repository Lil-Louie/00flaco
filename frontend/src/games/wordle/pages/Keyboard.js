import React, { Fragment } from "react";
import dimensions from "../utils/dimensions";

const { keyboardBoxSizes, keyboardRowsHGap } = dimensions;

const KeyboardLetterBox = ({ keyAttributes }) => {
  // separate non-style props so they don't end up in inline CSS
  const { letter, isEnterKey, isBackspaceKey, ...styleAttrs } = keyAttributes;

  return (
    <div
      style={{
        ...keyboardBoxSizes,
        borderWidth: 1,
        ...styleAttrs, // backgroundColor, color, borderColor, width overrides, etc.
      }}
      className="flex items-center justify-center select-none uppercase font-bold border"
    >
      {letter}
    </div>
  );
};

const Keyboard = ({ keyboard, onClickCallback, demoNumKeys }) => {
  const keyboardWidth =
    demoNumKeys * keyboardBoxSizes.width +
    (demoNumKeys - 1) * keyboardRowsHGap +
    200;

  return (
    <Fragment>
      {keyboard.map((row, rowIdx) => (
        <div
          key={`row-${rowIdx}`}
          className="flex justify-center"
          style={{ width: keyboardWidth }}
        >
          <div className="flex" style={{ gap: `${keyboardRowsHGap}px` }}>
            {row.map((keyAttributes, idx) => (
              <button
                type="button"
                key={`key-${rowIdx}-${idx}-${keyAttributes.letter}`}
                onClick={() => onClickCallback(keyAttributes)}
                className="cursor-pointer"
              >
                <KeyboardLetterBox keyAttributes={keyAttributes} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Keyboard;
