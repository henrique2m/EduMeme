import AuthActions from '../actions/auth';
import apiEduMeme from '../../services/api_edumeme';

import { toastError } from '../../pages/components/Toast';

function StudentMembersDispatch() {
  const studentMembersDispatch = {};

  const authActions = AuthActions();

  const { getUserToken } = authActions;

  async function indexStudentMembers(idClassroom) {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get('student/members', {
        headers: {
          Authorization: `Bearer ${token}`,
          ID_CLASSROOM: idClassroom,
        },
      });

      const membersData = response.data;

      return membersData;
    } catch (e) {
      toastError('Não foi possível carregar os desafios, tente novamente');
    }
  }

  studentMembersDispatch.indexStudentMembers = indexStudentMembers;

  return studentMembersDispatch;
}

export default StudentMembersDispatch;
