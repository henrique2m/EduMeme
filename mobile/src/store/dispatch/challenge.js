import AuthActions from '../actions/auth';
import apiEduMeme from '../../services/api_edumeme';

import { toastError } from '../../pages/components/Toast';

function ChallengeDispatch() {
  const challengesDispatch = {};

  const authActions = AuthActions();

  const { getUserToken } = authActions;

  async function indexChallenge(classroomSlug) {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get('challenges', {
        headers: {
          Authorization: `Bearer ${token}`,
          CLASSROOM: classroomSlug,
        },
      });

      const challengesData = response.data;

      return challengesData;
    } catch (e) {
      toastError('Não foi possível carregar os desafios,  tente novamente.');
    }
  }

  async function createChallenge(
    question,
    optionOne,
    optionTwo,
    optionThree,
    optionFour,
    correct,
    classroomSlug
  ) {
    try {
      const token = await getUserToken();

      const data = {
        question,
        optionOne,
        optionTwo,
        optionThree,
        optionFour,
        correct,
      };

      await apiEduMeme.post('challenges', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          CLASSROOM: classroomSlug,
        },
      });

      return true;
    } catch (e) {
      toastError('Não foi possível criar o desafio, tente novamente.');
    }
  }

  async function showChallenge(id, classroomSlug) {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get(`challenges/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          CLASSROOM: classroomSlug,
        },
      });

      const challengesData = response.data;

      return challengesData;
    } catch (e) {
      toastError('Não foi possível carregar o desafio, tente Novamente.');
    }
  }

  async function deleteChallenge(id, classroomSlug) {
    try {
      const token = await getUserToken();

      await apiEduMeme.delete(`challenges/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          CLASSROOM: classroomSlug,
        },
      });

      return true;
    } catch (e) {
      toastError('Não foi possível excluir o desafio, tente Novamente.');
    }
  }

  challengesDispatch.indexChallenge = indexChallenge;
  challengesDispatch.createChallenge = createChallenge;
  challengesDispatch.showChallenge = showChallenge;
  challengesDispatch.deleteChallenge = deleteChallenge;

  return challengesDispatch;
}

export default ChallengeDispatch;
