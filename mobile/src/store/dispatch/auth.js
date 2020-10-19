import AuthActions from '../actions/auth';
import AuthFacebook from './authFacebook';
import apiEduMeme from '../../services/api_edumeme';
import { toastError } from '../../pages/components/Toast';

function authDispatch() {
  const authDispatch = {};
  const authActions = AuthActions();
  const {
    updateUserToken,
    updateRegister,
    updateUserDataRegister,
  } = authActions;

  async function signIn() {
    const authFacebook = await AuthFacebook.signInFacebook(
      process.env.EXPO_KEY_FACEBOOK_APP
    );

    if (!authFacebook.status) {
      toastError('Não foi possível obter a autorização do Facebook.');
      return;
    }

    const { tokenFacebook, email, name, picture } = authFacebook.data;

    if (!email || email === '') {
      toastError(
        'Não conseguimos obter o seu E-mail, atualize seu cadastro no Facebook e tente novamente.'
      );

      return;
    }

    try {
      const response = await apiEduMeme.post('sessions', {
        email: email,
        password: tokenFacebook,
        username: name,
        avatar: picture.data.url,
      });

      const { token, infoUser } = response.data;

      if (!token) {
        if (infoUser.status === false) {
          const data = JSON.stringify(authFacebook.data);
          await updateRegister(true);
          await updateUserToken(false);
          await updateUserDataRegister(data);
          return { register: true, login: false };
        }
        return;
      }

      await updateUserToken(token);

      return { login: true, registe: false };
    } catch (err) {
      toastError('Não foi possível realizar o login, tente novamente.');
    }
  }

  async function signUp(data) {
    const { tokenFacebook, email, name, picture, type } = data;

    try {
      const response = await apiEduMeme.post('users', {
        email: email,
        password: tokenFacebook,
        username: name,
        avatar: picture.data.url,
        type: type,
      });
      const { token } = response.data;

      if (!token) {
        toastError('Ocorreu algo de errado, tente novamente.');
        return;
      }

      await updateUserToken(token);

      return { login: true };
    } catch (err) {
      toastError('Não foi possível realizar o login, tente novamente.');
    }
  }

  authDispatch.signIn = signIn;
  authDispatch.signUp = signUp;

  return authDispatch;
}

export default authDispatch;
