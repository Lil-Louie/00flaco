// src/utils/dimensions.js

// --- Board sizing logic ---
const rows = 18;
const columns = 18;

const boardSize = rows * columns;
const boardCells = boardSize - (rows * 4);

export const sizes = {
  rows,
  columns,
  boardSize,
  boardCells,
};

// --- UI / pixel dimensions ---
const dimensions = {
  widthOfCell: 25,
  heightOfCell: 25,
  width: 100,
  height: 50,
};

export default dimensions;
