import AuthActions from '../actions/auth';
import apiEduMeme from '../../services/api_edumeme';

import { toastError } from '../../pages/components/Toast';

function StudentChallengeDispatch() {
  const studentChallengesDispatch = {};

  const authActions = AuthActions();

  const { getUserToken } = authActions;

  async function indexStudentChallenge(idClassroom) {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get('student/challenges/', {
        headers: {
          Authorization: `Bearer ${token}`,
          ID_CLASSROOM: idClassroom,
        },
      });

      const challengesData = response.data;

      return challengesData;
    } catch (e) {
      toastError('Não foi possível carregar os desafios ,tente novamente.');
    }
  }

  async function showStudentChallenge(idChallenge, idClassroom) {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get(
        `student/challenges/${idChallenge}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ID_CLASSROOM: idClassroom,
          },
        }
      );

      const challengesData = response.data;

      return challengesData;
    } catch (e) {
      toastError('Não foi possível carregar o desafio, tente Novamente.');
    }
  }

  async function correctionStudentChallenge(
    idClassroom,
    idChallenge,
    alternative
  ) {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get(
        `student/challenges/correction/${idChallenge}/${alternative}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ID_CLASSROOM: idClassroom,
          },
        }
      );

      const challengesData = response.data;

      return challengesData;
    } catch (e) {
      toastError('Não foi possível responder o desafio, tente novamente');
    }
  }

  async function responseStudentChallenge(idClassroom, idChallenge, response) {
    try {
      const token = await getUserToken();

      const data = { response, idChallenge };

      await apiEduMeme.post('student/challenges/response', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          ID_CLASSROOM: idClassroom,
        },
      });

      return true;
    } catch (e) {
      toastError('Não foi possível corrigir o desafio, tente novamente');
    }
  }

  studentChallengesDispatch.indexStudentChallenge = indexStudentChallenge;
  studentChallengesDispatch.showStudentChallenge = showStudentChallenge;
  studentChallengesDispatch.responseStudentChallenge = responseStudentChallenge;
  studentChallengesDispatch.correctionStudentChallenge = correctionStudentChallenge;

  return studentChallengesDispatch;
}

export default StudentChallengeDispatch;
