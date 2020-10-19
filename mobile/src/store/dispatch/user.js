import UserActions from '../actions/user';
import AuthActions from '../actions/auth';
import apiEduMeme from '../../services/api_edumeme';
import { toastError } from '../../pages/components/Toast';

function UserDispatch() {
  const userDispatch = {};
  const userActions = UserActions();
  const authActions = AuthActions();
  const { setUser, getUser } = userActions;
  const { getUserToken } = authActions;

  async function userPersist() {
    try {
      const token = await getUserToken();
      const response = await apiEduMeme.get('users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await setUser(response.data);
      const userData = await getUser();

      return userData;
    } catch (e) {
      toastError('Não foi possível obter os dados do usuário.');
    }
  }

  userDispatch.userPersist = userPersist;

  return userDispatch;
}

export default UserDispatch;
