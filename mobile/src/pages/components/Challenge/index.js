import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { MaterialIcons as Icons } from '@expo/vector-icons';
import ChallengeDispatch from '../../../store/dispatch/challenge';
import StudentChallengeDispatch from '../../../store/dispatch/studentChallenge';
import { toastError } from '../Toast';
import Loading from '../Loading';
import Correction from '../Correction';

function Challenge(props) {
  const [checked, setChecked] = useState('');
  const [challenge, setChallenge] = useState('');
  const [loadingCorrection, setLoadingCorrection] = useState(false);
  const [loadingChallenge, setLoadingChallenge] = useState(false);
  const [hit, setHit] = useState(null);
  const [studentResponseChallenge, setStudentResponseChallenge] = useState(
    null
  );
  const {
    visible,
    toggleModalResponseChallenge,
    renderChallenge,
    permission,
  } = props;

  const challengeDispatch = ChallengeDispatch();
  const { showChallenge } = challengeDispatch;

  const studentChallengeDispatch = StudentChallengeDispatch();
  const {
    showStudentChallenge,
    correctionStudentChallenge,
    responseStudentChallenge,
  } = studentChallengeDispatch;

  async function handleShowChallenge() {
    if (renderChallenge === '') return;

    setLoadingChallenge(true);

    let dataChallenge = null;

    if (permission === 'teacher') {
      dataChallenge = await showChallenge(
        renderChallenge.challengeId,
        renderChallenge.classroomSlug
      );
    } else {
      dataChallenge = await showStudentChallenge(
        renderChallenge.challengeId,
        renderChallenge.classroomId
      );
    }

    if (!dataChallenge) {
      setLoadingChallenge(false);
      return;
    }

    const { responseChallenge, correct } = dataChallenge;

    if (responseChallenge !== null) {
      setStudentResponseChallenge(responseChallenge);
      setChecked(correct);
    }

    setLoadingChallenge(false);
    setChallenge(dataChallenge);
  }

  async function handleCorrectionQuestion() {
    if (permission === 'student') {
      setLoadingCorrection(true);
      const correction = await correctionStudentChallenge(
        renderChallenge.classroomId,
        renderChallenge.challengeId,
        checked
      );

      const { correct } = correction;

      if (correct === undefined) {
        setLoadingCorrection(false);
        return;
      }

      await responseStudentChallenge(
        renderChallenge.classroomId,
        renderChallenge.challengeId,
        checked
      );

      setHit(correct);

      setLoadingCorrection(false);
    }
  }

  async function handleModalChallenge(userAction) {
    toggleModalResponseChallenge(userAction, null);
  }

  useEffect(() => {
    handleShowChallenge();
  }, []);

  const HandleButtonsConfirmCancel = () => {
    return (
      <>
        <TouchableOpacity
          onPress={handleCorrectionQuestion}
          style={[styles.button, { backgroundColor: '#9AFF81' }]}
        >
          <Text style={styles.textButton}>CONFIRMAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleModalChallenge(false)}
          style={styles.button}
        >
          <Text style={styles.textButton}>CANCELAR</Text>
        </TouchableOpacity>
      </>
    );
  };

  const HandleButtonBack = () => {
    return (
      <TouchableOpacity
        onPress={() => handleModalChallenge(false)}
        style={[styles.button, { backgroundColor: '#f0f' }]}
      >
        <Text style={styles.textButton}>VOLTAR</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          {hit === null ? (
            <>
              {!loadingCorrection && !loadingChallenge ? (
                <View style={styles.modal}>
                  <View style={styles.header}>
                    <Icons name="speaker-notes" size={24} color="#000" />
                    <Text style={styles.headerText}> DESAFIO</Text>
                  </View>

                  {challenge !== '' && loadingChallenge === false ? (
                    <>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollView}
                      >
                        {permission === 'student' && (
                          <>
                            {checked !== '' &&
                              studentResponseChallenge === checked && (
                                <View style={styles.info}>
                                  <Icons
                                    name="check-circle"
                                    size={48}
                                    color="#11A420"
                                  />
                                </View>
                              )}
                            {studentResponseChallenge !== null &&
                              studentResponseChallenge !== checked && (
                                <View style={styles.info}>
                                  <Icons
                                    name="highlight-off"
                                    size={48}
                                    color="#FF5B5B"
                                  />
                                </View>
                              )}
                          </>
                        )}

                        <View style={styles.question}>
                          <Text style={styles.questionText}>
                            {challenge.question}
                          </Text>
                        </View>

                        {studentResponseChallenge === 'a' && (
                          <Text style={styles.textInfo}>SUA RESPOSTA</Text>
                        )}

                        <View
                          style={[
                            styles.boxOption,
                            checked === 'a' && { backgroundColor: '#11A420' },
                            studentResponseChallenge === 'a' &&
                              checked !== 'a' && {
                                backgroundColor: '#FF5B5B',
                              },
                          ]}
                        >
                          <View style={styles.boxRadius}>
                            {challenge.responseChallenge === null && (
                              <RadioButton
                                value="a"
                                status={
                                  checked === 'a' ? 'checked' : 'undefined'
                                }
                                onPress={() => setChecked('a')}
                                uncheckedColor="#fff"
                              />
                            )}

                            <Text style={styles.boxRadiusText}> A </Text>
                          </View>

                          <Text style={styles.textOption}>
                            {challenge.optionOne}
                          </Text>
                        </View>

                        {studentResponseChallenge === 'b' && (
                          <Text style={styles.textInfo}>SUA RESPOSTA</Text>
                        )}

                        <View
                          style={[
                            styles.boxOption,
                            checked === 'b' && { backgroundColor: '#11A420' },
                            studentResponseChallenge === 'b' &&
                              checked !== 'b' && {
                                backgroundColor: '#FF5B5B',
                              },
                          ]}
                        >
                          <View style={styles.boxRadius}>
                            {challenge.responseChallenge === null && (
                              <RadioButton
                                value="b"
                                status={
                                  checked === 'b' ? 'checked' : 'undefined'
                                }
                                onPress={() => setChecked('b')}
                                uncheckedColor="#fff"
                              />
                            )}

                            <Text style={styles.boxRadiusText}> B </Text>
                          </View>

                          <Text style={styles.textOption}>
                            {challenge.optionTwo}
                          </Text>
                        </View>

                        {studentResponseChallenge === 'c' && (
                          <Text style={styles.textInfo}>SUA RESPOSTA</Text>
                        )}

                        {challenge.optionThree && (
                          <View
                            style={[
                              styles.boxOption,
                              checked === 'c' && { backgroundColor: '#11A420' },
                              studentResponseChallenge === 'c' &&
                                checked !== 'c' && {
                                  backgroundColor: '#FF5B5B',
                                },
                            ]}
                          >
                            <View style={styles.boxRadius}>
                              {challenge.responseChallenge === null && (
                                <RadioButton
                                  value="c"
                                  status={
                                    checked === 'c' ? 'checked' : 'undefined'
                                  }
                                  onPress={() => setChecked('c')}
                                  uncheckedColor="#fff"
                                />
                              )}

                              <Text style={styles.boxRadiusText}> C </Text>
                            </View>

                            <Text style={styles.textOption}>
                              {challenge.optionThree}
                            </Text>
                          </View>
                        )}

                        {studentResponseChallenge === 'd' && (
                          <Text style={styles.textInfo}>SUA RESPOSTA</Text>
                        )}

                        {challenge.optionFour && (
                          <View
                            style={[
                              styles.boxOption,
                              checked === 'd' && { backgroundColor: '#11A420' },
                              studentResponseChallenge === 'd' &&
                                checked !== 'd' && {
                                  backgroundColor: '#FF5B5B',
                                },
                            ]}
                          >
                            <View style={styles.boxRadius}>
                              {challenge.responseChallenge === null && (
                                <RadioButton
                                  value="d"
                                  status={
                                    checked === 'd' ? 'checked' : 'undefined'
                                  }
                                  onPress={() => setChecked('d')}
                                  uncheckedColor="#fff"
                                />
                              )}

                              <Text style={styles.boxRadiusText}> D </Text>
                            </View>

                            <Text style={styles.textOption}>
                              {challenge.optionFour}
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                      {challenge.responseChallenge === null ? (
                        <HandleButtonsConfirmCancel />
                      ) : (
                        <HandleButtonBack />
                      )}
                    </>
                  ) : (
                    <>
                      <View style={styles.empty}>
                        <Text style={styles.emptyText}>
                          Desafio não encontrado.
                        </Text>
                      </View>
                      <HandleButtonBack />
                    </>
                  )}
                </View>
              ) : (
                <Loading colorText="#fff" />
              )}
            </>
          ) : (
            <Correction
              hit={hit}
              toggleModalResponseChallenge={(userAction, data) =>
                toggleModalResponseChallenge(userAction, data)
              }
              idChallenge={challenge.id}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  modal: {
    width: 350,
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    width: 300,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  scrollView: {
    paddingBottom: 10,
  },

  info: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInfo: {
    marginTop: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
  },

  question: {
    backgroundColor: '#f0f',
    width: 300,
    minHeight: 48,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    marginTop: 10,
  },

  boxRadius: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxRadiusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  questionText: {
    textAlign: 'justify',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  boxOption: {
    width: 300,
    minHeight: 42,
    alignItems: 'center',
    backgroundColor: '#7D4CAF',
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
  },

  textOption: {
    padding: 5,
    flex: 1,
    textAlign: 'justify',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },

  button: {
    width: 300,
    backgroundColor: '#FF5B5B',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Challenge;
