import AuthActions from '../actions/auth';
import apiEduMeme from '../../services/api_edumeme';

import { toastError } from '../../pages/components/Toast';

function studentDispatch() {
  const studentDispatch = {};

  const authActions = AuthActions();

  const { getUserToken } = authActions;

  async function indexStudentClassroom() {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get('student/classrooms', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const classroomsData = response.data;

      return classroomsData;
    } catch (e) {
      toastError('Não foi possível carregar as salas, tente novamente.');
    }
  }

  async function showStudentClassroom(id) {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get(`student/classrooms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const classroomsData = response.data;

      return classroomsData;
    } catch (e) {
      toastError('Não foi possível carregar a sala, tente Novamente.');
    }
  }

  studentDispatch.indexStudentClassroom = indexStudentClassroom;
  studentDispatch.showStudentClassroom = showStudentClassroom;

  return studentDispatch;
}

export default studentDispatch;
