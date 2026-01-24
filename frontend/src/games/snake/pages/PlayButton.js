import { Button } from "@mui/material";
import { Fragment } from "react";
import dimensions from "../utils/dimensions";

const PlayButton = (props) => {
    const { title, onClick } = props;
  
    return (
      <Fragment>
        <Button
          variant="contained"
          onClick={onClick} 
          sx={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: "green",
            display: "flex",
            m: 3
          }}
        >
          {title}
        </Button>
      </Fragment>
    );
  };
  
  export default PlayButton;
