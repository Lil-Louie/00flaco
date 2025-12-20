import React, { useMemo } from "react";
import { Box } from "@mui/material";
import dimensions from "../utils/dimensions";
import boxStyleVariants from "../utils/boxesAndTheirAttributes";

const BoardCell = React.memo(function BoardCell({ variant }) {
  const style = boxStyleVariants[variant] || boxStyleVariants.freeArea;

  return (
    <Box
      sx={{
        width: dimensions.widthOfCell,
        height: dimensions.heightOfCell,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.9rem",
        ...style,
      }}
    />
  );
});

const GameBoard = ({ board }) => {
  const rows = board.length;
  const cols = board[0].length;

  // Your "natural" pixel size
  const naturalW = cols * dimensions.widthOfCell + (cols - 1) * 2; // gap=2
  const naturalH = rows * dimensions.heightOfCell + (rows - 1) * 2;

  // Scale to fit viewport (mobile), but never scale up beyond 1
  const scale = useMemo(() => {
    // leave a little padding for borders/margins
    const maxW = window.innerWidth - 24;
    const maxH = window.innerHeight - 220; // header + score + button space
    return Math.min(1, maxW / naturalW, maxH / naturalH);
  }, [naturalW, naturalH]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1 }}>
      <Box
        sx={{
          width: naturalW,
          height: naturalH,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${dimensions.widthOfCell}px)`,
            gridTemplateRows: `repeat(${rows}, ${dimensions.heightOfCell}px)`,
            gap: "2px",
          }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <BoardCell
                key={`${r}-${c}`}
                variant={
                  cell === -1 ? "wall" :
                  cell === -2 ? "snake" :
                  cell === -3 ? "food" :
                  "freeArea"
                }
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GameBoard;
