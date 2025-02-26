import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Cabin", "sans-serif"].join(","),
    textTrasform: "none",
  },
  palette: {
    primary: {
      main: "#1976d2", // Default blue
      light: "#63a4ff", // Light blue
      dark: "#004ba0", // Dark blue
      contrastText: "#ffffff", // Text color on primary
    },
    secondary: {
      main: "#dc004e", // Pink
      light: "#ff5983",
      dark: "#9a0036",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#f5f5f5", // App background color
      paper: "#ffffff", // Paper background color
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
});

export default theme;
