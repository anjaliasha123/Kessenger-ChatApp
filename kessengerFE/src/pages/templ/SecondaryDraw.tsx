import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const SecondaryDraw = ()=>{
    const theme = useTheme();
    return(
        <Box 
        sx={{
            minWidth: `${theme.secondaryDrawer.width}px`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            mt: `calc(${theme.primaryAppBar.height}px + 40px)`,
            borderRight: `1px solid ${theme.palette.divider}`,
            display: {xs: "none", sm:"block",},
            overflow: "auto",
            }}>
                {[...Array(50)].map((_,i)=> (
                    <Typography key={i} paragraph>
                        {i+1}
                    </Typography>
                ))}
        </Box>
    )
}
export default SecondaryDraw;