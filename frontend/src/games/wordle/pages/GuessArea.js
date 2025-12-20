import React from "react";
import dimensions from "../utils/dimensions";

const GuessBox = React.memo(function GuessBox({ cellContent }) {
  const { backgroundColor, color, borderColor, letter } = cellContent;

  return (
    <div
      style={{
        width: dimensions.guessArea.widthOfLetterBox,
        height: dimensions.guessArea.heightOfLetterBox,
        backgroundColor,
        color,
        border: "2px solid",
        borderColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        textTransform: "uppercase",
        userSelect: "none",
        // optional: helps avoid repaint blur/jank on mobile
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {letter ?? ""}
    </div>
  );
}, (prev, next) => {
  // only rerender if what the tile *shows* changed
  return (
    prev.cellContent.letter === next.cellContent.letter &&
    prev.cellContent.backgroundColor === next.cellContent.backgroundColor &&
    prev.cellContent.borderColor === next.cellContent.borderColor &&
    prev.cellContent.color === next.cellContent.color
  );
});

const GuessArea = React.memo(function GuessArea({ allRows }) {
  const { numColumns, hGap, vGap, widthOfLetterBox } = dimensions.guessArea;

  return (
    <div
      style={{
        height: dimensions.guessAreaHeight,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: dimensions.guessAreaWidth, // exactly matches your calc
          display: "grid",
          gridTemplateColumns: `repeat(${numColumns}, ${widthOfLetterBox}px)`,
          columnGap: `${hGap}px`,
          rowGap: `${vGap}px`,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {allRows.map((cell, idx) => (
          <GuessBox key={cell.id ?? idx} cellContent={cell} />
        ))}
      </div>
    </div>
  );
});

export default GuessArea;
