import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const Main = ()=>{
    const theme = useTheme();
    return (
        <Box sx={{
            flexGrow: 1,
            mt: `calc(${theme.primaryAppBar.height}px + 40px)`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            overflow: "hidden",
            }}>
                {[...Array(50)].map((_,i)=> (
                    <Typography key={i} paragraph>
                        {i+1}
                    </Typography>
                ))}
        </Box>
    )
}
export default Main;