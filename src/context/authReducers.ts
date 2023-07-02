const types = {
  login: "SET_LOGIN",
  logout: "SET_LOGOUT"
};

const roles = {
  profesor: "profesor",
  estudiante: "estudiante"
};

const initialValues = {
  auth: false,
  loginResponse: {},

};

const authReducer = (state, action) => {
  switch (action.type) {
    case types.login:
      action.payload
      return {
        ...state,
        auth: true,
        loginResponse: action.payload
        // role: action.payload.role, // Actualiza el rol con el payload recibido
        // jwt: action.payload.jwt // Actualiza el jwt con el payload recibido
      };
    case types.logout:
      return {
        ...state,
        auth: false,
        loginResponse: {}

        // role: roles.estudiante, // Restablece el rol a su valor inicial al hacer logout
        // jwt: null // Restablece el jwt a null al hacer logout
      };
    default:
      return state;
  }
};

export { initialValues, types, roles };
export default authReducer;