import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import DrawToggle from "../../components/PrimaryDraw/DrawToggle";
import MuiDrawer from "@mui/material/Drawer";

const PrimaryDraw = ()=>{
    const theme = useTheme();
    const below600 = useMediaQuery("(max-width:599px");
    const [open, setOpen] = useState(!below600);

    const openedMixin = ()=>({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
    });

    const closedMixin = ()=>({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
        width: theme.primaryDrawer.closed,
    });

    const Drawer = styled(MuiDrawer, {})(({theme, open})=>({
        width: theme.primaryDrawer.width,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(),
            "& .MuiDrawer-paper": openedMixin(),
        }),
        ...(!open && {
            ...closedMixin(),
            "& .MuiDrawer-paper": closedMixin(),
        }),
    }));

    useEffect(()=>{
        setOpen(!below600);
    }, [below600]);


    const handleDrawOpen = ()=>{
        setOpen(true);
    };
    const handleDrawClose = ()=>{
        setOpen(false);
    };

    return (
    <Drawer open={open} variant={below600 ? "temporary" : "permanent"}
    PaperProps={{
        sx: {mt: `calc(${theme.primaryAppBar.height}px + 40px)`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        width: theme.primaryDrawer.width
        }
    }}
    >
        <Box>
            <Box sx={{position: "absolute", top: 0 , right: 0 , p: 0, width: open ? "auto": "100%"}}>
                <DrawToggle open={open} handleDrawClose={handleDrawClose} handleDrawOpen={handleDrawOpen}/>
                {[...Array(50)].map((_,i)=> (
                    <Typography key={i} paragraph>
                        {i+1}
                    </Typography>
                ))}
            </Box>
        </Box>
    </Drawer>)
};
export default PrimaryDraw;