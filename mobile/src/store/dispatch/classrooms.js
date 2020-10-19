import AuthActions from '../actions/auth';
import apiEduMeme from '../../services/api_edumeme';

import { toastError } from '../../pages/components/Toast';

function ClassroomsDispatch() {
  const classroomsDispatch = {};

  const authActions = AuthActions();

  const { getUserToken } = authActions;

  async function indexClassroom() {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get('classrooms', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const classroomsData = response.data;

      return classroomsData;
    } catch (e) {
      toastError('Não foi possível carregar as salas.');
    }
  }

  async function createClassroom(name, description) {
    try {
      const token = await getUserToken();

      const data = { name, description };

      await apiEduMeme.post('classrooms', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch (e) {
      toastError('Não foi possível criar uma nova sala, tente novamente.');
    }
  }

  async function showClassroom(id) {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get(`classrooms/${id}`, {
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

  async function deleteClassroom(id) {
    try {
      const token = await getUserToken();

      await apiEduMeme.delete(`classrooms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch (error) {
      toastError('Não foi possível excluir a sala, tente Novamente.');
    }
  }

  classroomsDispatch.indexClassroom = indexClassroom;
  classroomsDispatch.createClassroom = createClassroom;
  classroomsDispatch.showClassroom = showClassroom;
  classroomsDispatch.deleteClassroom = deleteClassroom;

  return classroomsDispatch;
}

export default ClassroomsDispatch;
