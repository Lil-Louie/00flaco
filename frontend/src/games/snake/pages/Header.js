import {Fragment} from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

const Header = (props) => {
    const title = props.title;

    return (
        <Fragment>
            <Box
            sx={{flexGrow: 0.5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant='h3' className='p-0'>
                    {title}
                </Typography>
            </Box>
        </Fragment>
    );
}

export default Header;
