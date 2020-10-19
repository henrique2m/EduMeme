import React, { useEffect, useMemo, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Home from '../pages/Home';
import LoginWithFacebook from '../pages/LoginWithFacebook';
import Register from '../pages/Register';

import AuthActions from '../store/actions/auth';

function Navigation() {
  const routes = useRoute();
  const { redirect } = routes.params;

  const [userToken, setUserToken] = useState(null);
  const [register, setPageRegister] = useState(null);

  const authActions = AuthActions();

  const {
    getUserToken,
    getRegister,
    signOut,
    updateRegister,
    updateUserDataRegister,
  } = authActions;

  useEffect(() => {
    async function verifyToken() {
      if (redirect === 'exit') {
        await signOut();
        setUserToken(null);
        return;
      }

      const token = await getUserToken();

      if (redirect === 'signUp-home') {
        await updateRegister(null);
        await updateUserDataRegister(null);

        setUserToken(token);
        setPageRegister(null);
        return;
      }

      const pageRegister = await getRegister();

      if (token !== null) {
        setUserToken(token);
        setPageRegister(pageRegister);
      }
    }

    verifyToken();
  }, [redirect]);

  return (
    <>
      {userToken === null ? (
        <LoginWithFacebook />
      ) : register !== null ? (
        <Register />
      ) : (
        <Home />
      )}
    </>
  );
}

export default Navigation;
