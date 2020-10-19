import AuthActions from '../actions/auth';
import apiEduMeme from '../../services/api_edumeme';

import { toastError } from '../../pages/components/Toast';

function MembersDispatch() {
  const membersDispatch = {};

  const authActions = AuthActions();

  const { getUserToken } = authActions;

  async function indexMembers(slug, add) {
    try {
      const token = await getUserToken();

      const response = await apiEduMeme.get(`members/${add}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          CLASSROOM: slug,
        },
      });

      const membersData = response.data;
      return membersData;
    } catch (error) {
      toastError('Não foi possível, carregar os alunos.');
    }
  }

  async function addMembers(slug, members) {
    try {
      const token = await getUserToken();

      const data = { members: members };

      await apiEduMeme.post('members', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          CLASSROOM: slug,
        },
      });

      return true;
    } catch (e) {
      toastError('Não foi possível adicionar os alunos, tente novamente.');
    }
  }

  async function removeMember(slug, email) {
    try {
      const token = await getUserToken();

      await apiEduMeme.delete(`members/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          CLASSROOM: slug,
        },
      });

      return true;
    } catch (e) {
      toastError('Não foi possível remover este aluno, tente novamente.');
    }
  }

  membersDispatch.indexMembers = indexMembers;
  membersDispatch.addMembers = addMembers;
  membersDispatch.removeMember = removeMember;

  return membersDispatch;
}

export default MembersDispatch;
