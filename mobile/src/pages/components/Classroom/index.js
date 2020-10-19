import React, { useMemo, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import ClassroomDispatch from '../../../store/dispatch/classrooms';
import StudentDispatch from '../../../store/dispatch/studentClassroom';
import Members from '../Members';
import ActionsTeacher from '../ActionsTeacher';
import Challenges from '../Challenges';
import Loading from '../Loading';

function Classroom(props) {
  const {
    permission,
    classroomId,
    toggleModalNewChallenge,
    toggleModalNewMembers,
    toggleModalResponseChallenge,
    handleResetStateChallenge,
    handleReloadClassrooms,
    renderNewChallenge,
    renderChallenges,
    renderNewMembers,
  } = props;

  const [classroom, setClassroom] = useState('');
  const [deleteClassroom, setDeleteClassroom] = useState(false);

  const classroomDispatch = ClassroomDispatch();
  const { showClassroom } = classroomDispatch;

  const studentDispatch = StudentDispatch();

  const { showStudentClassroom } = studentDispatch;

  async function handleClassroom() {
    if (permission === 'teacher') {
      const dataClassroom = await showClassroom(classroomId);

      if (!dataClassroom) return;

      setClassroom(dataClassroom);
      setDeleteClassroom(false);
      return;
    }

    if (permission === 'student') {
      const dataClassroom = await showStudentClassroom(classroomId);

      if (!dataClassroom) return;

      setClassroom(dataClassroom.classroom);
      return;
    }
  }

  function handleDeletedClassroom() {
    setDeleteClassroom(true);
  }

  function handleModalNewChallenge() {
    toggleModalNewChallenge();
  }

  function handleModalNewMembers() {
    toggleModalNewMembers();
  }

  useMemo(() => {
    handleClassroom();
  }, [classroomId]);

  return (
    <View style={styles.container}>
      {!deleteClassroom ? (
        <>
          {classroom !== '' ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}
            >
              <View style={styles.boxClassroom}>
                <Image
                  source={{
                    uri: `https://api.adorable.io/avatars/100/${classroom.slug}`,
                  }}
                  style={styles.avatarClassroom}
                />
                <Text style={styles.nameClassroom}>{classroom.name}</Text>
                {classroom.description !== null && (
                  <Text style={styles.descriptionClassroom}>
                    {classroom.description}
                  </Text>
                )}
              </View>
              {permission === 'teacher' && (
                <ActionsTeacher
                  handleModalNewChallenge={() => handleModalNewChallenge()}
                  handleModalNewMembers={() => handleModalNewMembers()}
                  handleDeletedClassroom={() => handleDeletedClassroom()}
                  handleReloadClassrooms={(classroomID) =>
                    handleReloadClassrooms(classroomID)
                  }
                  classroomId={classroomId}
                />
              )}

              <Challenges
                permission={permission}
                classroomSlug={classroom.slug}
                classroomId={classroom.id}
                renderNewChallenge={renderNewChallenge}
                renderChallenges={renderChallenges}
                toggleModalResponseChallenge={(userAction, data) =>
                  toggleModalResponseChallenge(userAction, data)
                }
                handleResetStateChallenge={() => handleResetStateChallenge()}
                handleModalNewChallenge={() => handleModalNewChallenge()}
              />

              <Members
                permission={permission}
                classroomSlug={classroom.slug}
                classroomId={classroom.id}
                renderNewMembers={renderNewMembers}
                handleModalNewMembers={() => handleModalNewMembers()}
              />
            </ScrollView>
          ) : (
            <View>
              <Loading />
            </View>
          )}
        </>
      ) : (
        <Text style={styles.deletedClassroom}> Sala excluída com sucesso!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: 20,
  },
  boxClassroom: {
    width: 344,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarClassroom: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
  },
  nameClassroom: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  descriptionClassroom: {
    marginTop: 5,
    fontSize: 16,
    color: '#ddd',
  },

  deletedClassroom: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ddd',
  },
});

export default Classroom;
