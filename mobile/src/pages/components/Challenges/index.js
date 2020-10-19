import React, { useState, useEffect, useMemo } from 'react';
import ChallengeDispatch from '../../../store/dispatch/challenge';
import StudentChallengeDispatch from '../../../store/dispatch/studentChallenge';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons as Icons } from '@expo/vector-icons';

function Challenges(props) {
  const {
    classroomSlug,
    classroomId,
    renderNewChallenge,
    renderChallenges,
    permission,
    toggleModalResponseChallenge,
    handleModalNewChallenge,
    handleResetStateChallenge,
  } = props;
  const [challenges, setChallenges] = useState([]);

  const challengeDispatch = ChallengeDispatch();
  const {
    indexChallenge,
    createChallenge,
    deleteChallenge,
  } = challengeDispatch;

  const studentChallengeDispatch = StudentChallengeDispatch();
  const { indexStudentChallenge } = studentChallengeDispatch;

  async function handleChallenges() {
    let challengesData = null;

    if (permission === 'teacher') {
      challengesData = await indexChallenge(classroomSlug);
    } else {
      challengesData = await indexStudentChallenge(classroomId);
    }

    if (!challengesData) return;

    setChallenges(challengesData.reverse());
  }

  async function handleCreateChallenge() {
    if (renderNewChallenge === '') return;

    const {
      question,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      correct,
    } = renderNewChallenge;

    const responseNewChallenge = await createChallenge(
      question,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      correct,
      classroomSlug
    );

    if (!responseNewChallenge) return;

    await handleChallenges();
    handleResetStateChallenge();
  }

  function handleDeleteChallenge(challengeId) {
    async function confirmDelete() {
      const deleted = await deleteChallenge(challengeId, classroomSlug);

      if (deleted) {
        handleChallenges();
      }
    }

    Alert.alert(
      'EXCLUIR SALA',
      'Tem certeza que deseja excluir o desafio?',
      [
        {
          text: 'NÃO',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: () => confirmDelete(),
        },
      ],
      { cancelable: false }
    );
  }

  function handleToggleModalResponseChallenge(userActions, data) {
    toggleModalResponseChallenge(userActions, data);
  }

  useEffect(() => {
    handleChallenges();
  }, [classroomSlug]);

  useMemo(() => {
    handleChallenges();
  }, [renderChallenges]);

  useMemo(() => {
    function newChallenge() {
      if (renderNewChallenge !== '') {
        handleCreateChallenge();
      }
    }

    newChallenge();
  }, [renderNewChallenge]);
  return (
    <View style={styles.boxChallenges}>
      <View style={styles.headerChallenges}>
        <Icons name="extension" size={24} color="#fff" />
        <Text style={styles.headerText}>DESAFIOS</Text>
      </View>
      {challenges.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={styles.listChallenge}
            data={challenges}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  handleToggleModalResponseChallenge(true, {
                    challengeId: item.id,
                    classroomSlug: classroomSlug,
                    classroomId: classroomId,
                  })
                }
                hitSlop={{
                  top: 5,
                  bottom: 5,
                  left: 5,
                  right: 5,
                }}
              >
                <View
                  style={[
                    styles.challenge,
                    item.responseChallenge !== null &&
                      permission === 'student' && {
                        backgroundColor: '#ddd',
                      },
                  ]}
                >
                  <View style={styles.boxIcon}>
                    <Icons
                      name="speaker-notes"
                      size={32}
                      color={
                        item.responseChallenge !== null &&
                        permission === 'student'
                          ? '#000'
                          : '#fff'
                      }
                    />
                  </View>
                  <Text
                    style={styles.question}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {item.question}
                  </Text>

                  {permission === 'teacher' && (
                    <TouchableOpacity
                      onPress={() => handleDeleteChallenge(item.id)}
                      hitSlop={{
                        top: 5,
                        bottom: 5,
                        left: 5,
                        right: 5,
                      }}
                    >
                      <View
                        style={[
                          styles.boxIcon,
                          {
                            borderTopStartRadius: 0,
                            borderBottomStartRadius: 0,
                            borderTopEndRadius: 10,
                            borderBottomEndRadius: 10,
                          },
                        ]}
                      >
                        <Icons name="delete" size={32} color="#fff" />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.empty}>
          {permission === 'teacher' ? (
            <>
              <Text style={styles.emptyText}> Comece criando um desafio.</Text>
              <TouchableOpacity onPress={() => handleModalNewChallenge()}>
                <Icons name="add-circle-outline" size={62} color="#fff" />
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.emptyText}>
              Está sala ainda não possui desafios.
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxChallenges: {
    width: 344,
    height: 400,
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  headerChallenges: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginLeft: 5,
  },
  listChallenge: {
    paddingVertical: 10,
  },

  challenge: {
    backgroundColor: '#f0f',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },

  question: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
  boxIcon: {
    backgroundColor: '#fff',
    height: 60,
    width: 50,
    opacity: 0.8,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Challenges;
