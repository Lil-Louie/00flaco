import { green, grey, yellow, red } from '@mui/material/colors';

const boxStyleVariants = {
  freeArea: {
    color: grey[900],
    border: `1px solid ${grey[900]}`,
  },

  wall: {
    backgroundColor: red[700],
    color: red[700],
    border: `1px solid ${red[700]}`,
  },

  snake: {
    backgroundColor: green[500],
    color: green[50],
    border: `1px solid ${green[700]}`,
  },

  food: {
    backgroundColor: yellow[500],
    color: yellow[50],
    border: `1px solid ${yellow[700]}`,
  },
};

export default boxStyleVariants;
