const types = {
    login: "SET_LOGIN",
    logout: "SET_LOGOUT"
  };

  const roles = {
    profesor : "profesor",
    estudiante : "estudiante"
  }
  
  
  
  const initialValues = {
    role:roles.estudiante,
    auth: false,
  };
  
  const authReducer = (state, action) => {
    switch (action.type) {
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
  export default authReducer;