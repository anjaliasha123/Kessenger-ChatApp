import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templ/PrimaryAppBar";
import PrimaryDraw from "./templ/PrimaryDraw";
import SecondaryDraw from "./templ/SecondaryDraw";
import Main from "./templ/Main";

const Home = ()=>{
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline />
            <PrimaryAppBar />
            <PrimaryDraw />
            <SecondaryDraw />
            <Main/>
        </Box>
    )
};
export default Home;