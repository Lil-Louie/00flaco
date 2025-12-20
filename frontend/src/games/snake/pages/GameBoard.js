import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import boxStyleVariants from "../utils/boxesAndTheirAttributes";

const GAP = 2;

const BoardCell = React.memo(function BoardCell({ size, variant }) {
  const style = boxStyleVariants[variant] || boxStyleVariants.freeArea;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    />
  );
});

const GameBoard = ({ board }) => {
  const wrapRef = useRef(null);
  const [wrapW, setWrapW] = useState(484);

  const rows = board.length;
  const cols = board[0].length;

  useEffect(() => {
    if (!wrapRef.current) return;

    const ro = new ResizeObserver(([entry]) => {
      setWrapW(entry.contentRect.width);
    });

    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // ✅ Width-only sizing: stable vs mobile address bar height changes
  const cellSize = useMemo(() => {
    const totalGaps = (cols - 1) * GAP;
    const maxCell = Math.floor((wrapW - totalGaps) / cols);

    // cap so desktop still uses your preferred large size (adjust 24/28/etc)
    return Math.min(maxCell, 24); // <-- pick your "desktop" cell size cap
  }, [wrapW, cols]);

  return (
    <Box ref={wrapRef} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gap: `${GAP}px`,
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <BoardCell
              key={`${r}-${c}`}
              size={cellSize}
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
