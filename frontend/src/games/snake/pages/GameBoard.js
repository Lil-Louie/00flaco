import { Fragment } from "react";
import { Box } from "@mui/material";
import dimensions from "../utils/dimensions";
import boxStyleVariants from "../utils/boxesAndTheirAttributes";

const BoardCell = ({ variant, value }) => {
  const style = boxStyleVariants[variant] || boxStyleVariants.freeArea;

  return (
    <Box
      sx={{
        width: dimensions.widthOfCell,
        height: dimensions.heightOfCell, // fixed typo (was heightOCell)
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.9rem",
        ...style, // apply variant colors
      }}
    >
      {value ?? ""}
    </Box>
  );
};

const GameBoard = ({ board }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1, // optional padding around the grid
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${board[0].length}, ${dimensions.widthOfCell}px)`,
          gridTemplateRows: `repeat(${board.length}, ${dimensions.heightOfCell}px)`,
          gap: "2px",
        }}
      >
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <BoardCell
              key={`${rowIdx}-${colIdx}`}
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
  );
};

export default GameBoard;

