import {Fragment} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import dimensions from "../utils/dimensions";
const GuessBox = ({ cellContent }) => {
    const { backgroundColor, color, borderColor, letter } = cellContent;
  
    return (
      <Box
        sx={{
          width: dimensions.guessArea.widthOfLetterBox,
          height: dimensions.guessArea.heightOfLetterBox,
          backgroundColor,
          color,                 // ✅ show letters
          border: "2px solid",   // ✅ visible outline
          borderColor,
  
          display: "flex",       // ✅ center the letter
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          textTransform: "uppercase",
          userSelect: "none",
  
          m: 0.4,
          p: 0,
        }}
      >
        {letter ?? ""}
      </Box>
    );
  };

  
  
const GuessArea = (props) => {

    const allRows = props.allRows;

    return (
        <Fragment>

            <Box sx={{
                height: dimensions.guessAreaHeight,
                width: "100%",    // sets the stage for centering the grid in the container of this component
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Grid container columns={dimensions.guessArea.numColumns}
                  sx={{
                      height: dimensions.guessAreaHeight,
                      width: dimensions.guessAreaWidth,
                  }}
            >
                {
                    allRows.map((boxAttributes, idx) =>
                        <Grid item xs={1}
                              key={idx}
                              sx={{margin: 0,
                                      padding: 0
                                  }}
                        >
                            <GuessBox cellContent={boxAttributes} />
                            
                        </Grid>
                    )

                }
            </Grid>
            </Box>
        </Fragment>
    )
};

export default GuessArea;