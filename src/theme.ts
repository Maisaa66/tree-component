import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

const colors = { 
  darkElevation0: "#000028",
  darkElevation1: "#23233C",
  darkElevation2: "#37374D",
  darkElevation3: "#404057",
  darkElevation4: "#4a4a64",
  darkElevation5: "#111127",
  darkElevation6: "#262636",
  darkElevation7: "#0a0a21",
  lightBackgroundColor0: "#66667e",
  lightBackgroundColor1: "#e0e0e0",
  lightFontColor0: "#ffffff",
  selectedItemColor: "#1491EB",
  deepBlue10: "#E5E5E9",
  deepBlue20: "#CCCCD4",
  deepBlue30: "#B3B3BE",
  deepBlue40: "#9999A9",
  deepBlue55: "#737389",
  deepBlue60: "#66667E",
  deepBlue65: "#5C5C74",
  deepBlue70: "#4C4C68",
  deepBlue75: "#1F1F3D",
  deepBlue80: "#333353",
  deepBlue85: "#262648",
  focusBorder: "#1491EB",
  indicatorColor: "#00FCBC",
  dropSlotBorderColor: "#CCCCD4",
  softGreen: "#00D7A0",
  mutedBlue: "#3D9CCC",
  mutedSoftBlue: "#33B7CC",
  feedbackRed: "#CC5260",
  feedbackYellow: "#CCB452",
  feedbackPurple: "#6352CC",
  interactiveCoral: "#00CCCC",
  interactiveCoralBright:"#00E5E5",
  boldGreen: "#00FFB9",
};

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    darkElevation0: string;
    darkElevation1: string;
    darkElevation2: string;
    darkElevation3: string;
    darkElevation4: string;
    darkElevation5: string;
    darkElevation6: string;
    darkElevation7: string;
    lightBackgroundColor0: string;
    lightBackgroundColor1: string;
    lightFontColor0: string;
    selectedItemColor: string;
    deepBlue10: string;
    deepBlue20: string;
    deepBlue30: string;
    deepBlue40: string;
    deepBlue55: string;
    deepBlue60: string;
    deepBlue65: string;
    deepBlue70: string;
    deepBlue75: string;
    deepBlue80: string;
    deepBlue85: string;
    focusBorder: string;
    indicatorColor: string;
    dropSlotBorderColor: string;
    softGreen: string;
    mutedBlue: string;
    mutedSoftBlue: string;
    feedbackRed: string;
    feedbackYellow: string;
    feedbackPurple: string;
    interactiveCoral: string;
    interactiveCoralBright: string,
    boldGreen: string;
  }
}

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    common: {
      darkElevation0: colors.darkElevation0,
      darkElevation1: colors.darkElevation1,
      darkElevation2: colors.darkElevation2,
      darkElevation3: colors.darkElevation3,
      darkElevation4: colors.darkElevation4,
      darkElevation5: colors.darkElevation5,
      darkElevation6: colors.darkElevation6,
      darkElevation7: colors.darkElevation7,
      lightBackgroundColor0: colors.lightBackgroundColor0,
      lightBackgroundColor1: colors.lightBackgroundColor1,
      lightFontColor0: colors.lightFontColor0,
      selectedItemColor: colors.selectedItemColor,
      deepBlue10: colors.deepBlue10,
      deepBlue20: colors.deepBlue20,
      deepBlue30: colors.deepBlue30,
      deepBlue40: colors.deepBlue40,
      deepBlue55: colors.deepBlue55,
      deepBlue60: colors.deepBlue60,
      deepBlue65: colors.deepBlue65,
      deepBlue70: colors.deepBlue70,
      deepBlue75: colors.deepBlue75,
      deepBlue80: colors.deepBlue80,
      deepBlue85: colors.deepBlue85,
      focusBorder: colors.focusBorder,
      indicatorColor: colors.indicatorColor,
      dropSlotBorderColor: colors.dropSlotBorderColor,
      softGreen: colors.softGreen,
      mutedBlue: colors.mutedBlue,
      mutedSoftBlue: colors.mutedSoftBlue,
      feedbackRed: colors.feedbackRed,
      feedbackYellow: colors.feedbackYellow,
      feedbackPurple: colors.feedbackPurple,
      interactiveCoral: colors.interactiveCoral,
      interactiveCoralBright: colors.interactiveCoralBright,
      boldGreen: colors.boldGreen,
    },
    background: {
      default: colors.deepBlue60,
    },
    primary: {
      main: "#ffffff",
      contrastText: colors.deepBlue30,
    },
    secondary: {
      main: "#37374D",
    },
  },
  typography: {
    allVariants: {
      fontSize: '12px',
      color: "#ffffff",
      userSelect: 'none'
    },
    h1: {
      fontSize: '24px',
      marginBottom: '16px',
    },
    h2: {
      fontSize: '20px',
    },
    h3: {
      fontSize: '16px',
    },
    h4: {
      fontSize: '15px',
    },
    h5: {
      fontSize: '14px',
      fontWeight: 'bold'
    },
    button: {
      fontWeight: 'bold'
    },
    body2: {
      fontWeight: 'bold'
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
        focusVisible: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: colors.darkElevation2,
          },
          color: colors.deepBlue20,
          backgroundColor: colors.deepBlue70,
          border: `1px solid ${colors.deepBlue85}`,
          borderRadius: "4px",
          textTransform: 'none',
          fontWeight: 700,
          minHeight: 16,
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          height: "32px",
          minHeight: "32px",
        },
        flexContainer: {
          height: "32px",
        },
        scroller: {
          height: "32px",
          paddingTop: 0,
          marginTop: 0,
          textTransform: 'none',
          minWidth: 128,
          backgroundColor: colors.darkElevation3,
        },
        indicator: {
          backgroundColor: colors.selectedItemColor,
          height: 3,
        },
        scrollButtons: {
          backgroundColor: colors.darkElevation3,
          opacity: 1,
          color: '#ffffff',
          '&.Mui-disabled': {
            color: '#ffffff',
            opacity: 1,
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 16,
          fontSize: "12px",
          fontStyle: 'normal',
          textDecoration: 'none',
          textTransform: 'none',
          backgroundColor: colors.darkElevation3,
          "&.Mui-selected": {
            "backgroundColor": colors.deepBlue65
          }
        }
      }
    },
    MuiDialog: {
      defaultProps: {
        color: 'primary',
        PaperProps: {
          style: {
            backgroundColor: colors.darkElevation5
          }
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        track: {
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            opacity: 1,
            backgroundColor: colors.softGreen
          }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
          backgroundColor: colors.darkElevation2,
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: colors.darkElevation2,
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
          fontSize: "14px"
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecorationLine: "underline",
          textDecorationColor: "#FFFFFF",
          '&:hover': {
            background: colors.boldGreen,
            color: colors.darkElevation0
          }
        }
      }
    },
    MuiAccordion: {
      defaultProps: {
        disableGutters: true
      }
    }
  }
};

const darkTheme: Theme = createTheme(darkThemeOptions);

export { darkTheme }; // eslint-disable-line import/prefer-default-export
