import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import { ThemeProvider } from "@mui/material"
import { createMuiTheme } from "./theme/theme"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home/>}/>
    </Route>
  )
)

function App() {
  const theme = createMuiTheme();
  return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
  )
}

export default App
