import { createMuiTheme } from '@material-ui/core/styles'
import { amber, deepOrange } from '@material-ui/core/colors'

// Create a theme instance.
export const createTheme = (prefersDarkMode: boolean) =>
  createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      background: {
        paper: prefersDarkMode ? '#121212' : '#ffffff',
        default: prefersDarkMode ? '#121212' : '#ffffff',
      },
      primary: amber,
      secondary: deepOrange,
    },
    overrides: {
      MuiIconButton: {
        root: {
          color: 'inherit',
        },
      },
      MuiButton: {
        root: {
          textTransform: 'initial',
          fontWeight: 400,
        },
      },
      MuiTypography: {
        button: {
          textTransform: 'initial',
          fontWeight: 400,
        },
      },
      MuiCardHeader: {
        avatar: {
          marginRight: '8px',
        },
      },
    },
  })
