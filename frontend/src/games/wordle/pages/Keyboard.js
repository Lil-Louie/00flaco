import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";

const GAP = 6;
const KEY_HEIGHT = 50;
const FUNC_KEY_MULT = 1.5;

const Keyboard = ({ keyboard, onClickCallback }) => {
  const wrapRef = useRef(null);
  const [wrapW, setWrapW] = useState(484);


  useEffect(() => {
    if (!wrapRef.current) return;

    const ro = new ResizeObserver(([entry]) => {
      setWrapW(entry.contentRect.width);
    });

    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <Fragment>
      <div
        ref={wrapRef}
        style={{
          width: "min(484px, 100%)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: `${GAP}px`,
        }}
      >
        {keyboard.map((row, rowIdx) => {
          const funcCount = row.reduce(
            (acc, k) => acc + (k.isEnterKey || k.isBackspaceKey ? 1 : 0),
            0
          );
          const normalCount = row.length - funcCount;
          const totalUnits = normalCount + funcCount * FUNC_KEY_MULT;

          const totalGaps = (row.length - 1) * GAP;
          const unitWidth = Math.floor((wrapW - totalGaps) / totalUnits);

          return (
            <div
              key={`row-${rowIdx}`}
              style={{ display: "flex", justifyContent: "center", gap: `${GAP}px` }}
            >
              {row.map((keyAttributes, idx) => {
                const { letter, isEnterKey, isBackspaceKey, width: _ignoreWidth, ...styleAttrs } = keyAttributes;
                const isFunc = isEnterKey || isBackspaceKey;
                const width = isFunc ? Math.round(unitWidth * FUNC_KEY_MULT) : unitWidth;

                return (
                  <button
                    key={`key-${rowIdx}-${idx}-${letter}`}
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
                    <div
                      style={{
                        width,
                        height: KEY_HEIGHT,
                        boxSizing: "border-box",
                        borderWidth: 1,
                        borderStyle: "solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        userSelect: "none",
                        WebkitTapHighlightColor: "transparent",

                                                // ✅ font size: smaller for Enter/Delete on small screens
                        fontSize: isFunc
                        ? (wrapW < 420 ? 10 : 12)   // tweak numbers
                        : (wrapW < 420 ? 12 : 14),

                        ...styleAttrs,
                      }}
                    >
                      {letter}
                    </div>
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
