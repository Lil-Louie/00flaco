import React, { Fragment, useMemo } from "react";

const KEYBOARD_TARGET_WIDTH = 484;
const KEYBOARD_HEIGHT = 198;
const GAP = 6; // Wordle-like spacing
const KEY_HEIGHT = 50;
const FUNC_KEY_MULT = 1.5;

const KeyboardLetterBox = React.memo(function KeyboardLetterBox({
  keyAttributes,
  width,
}) {
  // ✅ separate non-style props so they don't end up in inline CSS
  const { letter, isEnterKey, isBackspaceKey, ...styleAttrs } = keyAttributes;

  return (
    <div
      style={{
        width,
        height: KEY_HEIGHT,
        borderWidth: 1,
        borderStyle: "solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        textTransform: "uppercase",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        ...styleAttrs, // backgroundColor, color, borderColor, etc.
      }}
    >
      {letter}
    </div>
  );
});

const Keyboard = ({ keyboard, onClickCallback }) => {
  // The outer width can shrink on mobile
  const outerStyle = useMemo(
    () => ({
      width: "min(484px, 100%)",
      height: KEYBOARD_HEIGHT,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: `${GAP}px`,
      margin: "0 auto",
    }),
    []
  );

  return (
    <Fragment>
      <div style={outerStyle}>
        {keyboard.map((row, rowIdx) => {
          // Count how many func keys are in this row
          const funcCount = row.reduce(
            (acc, k) => acc + (k.isEnterKey || k.isBackspaceKey ? 1 : 0),
            0
          );
          const normalCount = row.length - funcCount;

          // Total "units" in this row (normal keys = 1 unit, func keys = 1.5 units)
          const totalUnits = normalCount + funcCount * FUNC_KEY_MULT;

          // Gaps between keys
          const totalGaps = (row.length - 1) * GAP;

          // Compute width of 1 unit so that the WHOLE ROW fits 484px
          const unitWidth = Math.floor(
            (KEYBOARD_TARGET_WIDTH - totalGaps) / totalUnits
          );

          return (
            <div
              key={`row-${rowIdx}`}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: `${GAP}px`,
              }}
            >
              {row.map((keyAttributes, idx) => {
                const isFunc =
                  keyAttributes.isEnterKey || keyAttributes.isBackspaceKey;

                const keyWidth = isFunc
                  ? Math.round(unitWidth * FUNC_KEY_MULT)
                  : unitWidth;

                return (
                  <button
                    key={`key-${rowIdx}-${idx}-${keyAttributes.letter}`}
                    type="button"
                    onClick={() => onClickCallback(keyAttributes)}
                    style={{
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      touchAction: "manipulation",
                    }}
                  >
                    <KeyboardLetterBox
                      keyAttributes={keyAttributes}
                      width={keyWidth}
                    />
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Keyboard;
