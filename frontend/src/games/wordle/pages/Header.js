import {Typography} from "@mui/material";

const Header = props => {

    const title = props.title;

    return (
        <section className="my-5">
            <Typography className="m-0" variant="h4">
                { title }
            </Typography>
        </section>
    )
};

export default Header;