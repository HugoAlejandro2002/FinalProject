const types = {
  light: "SET_LIGHT_THEME",
  dark: "SET_DARK_THEME",
  login: "SET_LOGIN",
  logout: "SET_LOGOUT"
};


const lightTheme = {
  palette: {
    primary: {
      main: '#2196F3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF5722',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#333333',
    },
    warning: {
      main: '#FFEB3B',
      contrastText: '#000000',
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
    },
  },
};

const darkTheme = {
  palette: {
    primary: {
      main: '#333333',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFA726',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#212121',
      paper: '#212121',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
    },
    warning: {
      main: '#FFEB3B',
      contrastText: '#000000',
    },
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
    },
  },
};

// Colores adicionales
lightTheme.palette.primary.main = '#03A9F4';
lightTheme.palette.secondary.main = '#8BC34A';

darkTheme.palette.primary.main = '#666666';
darkTheme.palette.secondary.main = '#4CAF50';


const initialValues = {
  isLight:false,
  palette: darkTheme.palette,
  auth: false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case types.light:
      return {
        ...state,
        palette: lightTheme.palette,
        isLight:true,
      };
    case types.dark:
      return {
        ...state,
        palette: darkTheme.palette,
        isLight:false,
      };
    case types.login:
      return {
        ...state,
        auth: true
      };
    case types.logout:
      return {
        ...state,
        auth: false
      };
    default:
      return state;
  }
};



export { initialValues, types };
export default themeReducer;