import { configureAuth } from 'react-query-auth';
import authFunctions from '../utility/authFunctions';

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn: authFunctions.getUser,
    loginFn: authFunctions.login,
    registerFn: authFunctions.createUser,
    logoutFn: authFunctions.logout
  });
