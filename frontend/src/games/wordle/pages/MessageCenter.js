import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

import dimensions from "../utils/dimensions";
const MessageCenter = props => {

    const message = props.message;

    return (
        <Box sx={{
            width: "100%",
            height: dimensions.messageCenterHeight,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="h4">
                 {message}
            </Typography>
        </Box>
    )
};

export default MessageCenter;