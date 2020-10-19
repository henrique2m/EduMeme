import React, { useState, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { MaterialIcons as Icons } from '@expo/vector-icons';

function NewChallenge({ visible, toggleModalNewChallenge }) {
  const inputOptionOne = useRef(null);
  const inputOptionTwo = useRef(null);
  const inputOptionThree = useRef(null);
  const inputOptionFour = useRef(null);

  const [question, setQuestion] = useState('');
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionFour, setOptionFour] = useState('');

  const [checked, setChecked] = useState('');

  const [info, setInfo] = useState('');

  function handleNewChallenge(userAction) {
    if (userAction) {
      if (question === '') {
        setInfo('Crie uma pergunta.');
        return;
      }

      if (optionOne === '') {
        setInfo('A alternativa (A) é obrigatória.');
        return;
      }

      if (optionTwo === '') {
        setInfo('A alternativa (B) é obrigatória.');
        return;
      }

      if (optionFour !== '' && optionThree === '') {
        setInfo('Você precisa informar a alternativa (C)');
        return;
      }

      if (checked === '') {
        setInfo('Você precisa informar a alternativa correta.');
        return;
      }

      switch (checked) {
        case 'c':
          if (optionThree === '') {
            setInfo('Preencha o campo referente a alternativa (C)');
            return;
          }
        case 'd':
          if (optionFour === '') {
            setInfo('Preencha o campo referente a alternativa (D)');
            return;
          }
      }
    }

    const data = userAction
      ? {
          question: question,
          optionOne: optionOne,
          optionTwo: optionTwo,
          optionThree: optionThree,
          optionFour: optionFour,
          correct: checked,
        }
      : null;

    toggleModalNewChallenge(userAction, data);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.modal}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
          >
            <View style={styles.header}>
              <Icons name="add" size={24} color="#000" />
              <Text style={styles.headerText}>NOVO DESAFIO</Text>
            </View>
            {info !== '' && <Text style={styles.info}>{info}</Text>}
            <TextInput
              autoFocus
              underlineColorAndroid="transparent"
              returnKeyType="next"
              value={question}
              onChangeText={setQuestion}
              placeholder="Pergunta *"
              onSubmitEditing={() => inputOptionOne.current.focus()}
              style={styles.textInput}
            />
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="next"
              value={optionOne}
              onChangeText={setOptionOne}
              placeholder="Alternativa (A) *"
              onSubmitEditing={() => inputOptionTwo.current.focus()}
              style={[
                styles.textInput,
                checked === 'a' && {
                  backgroundColor: '#11A420',
                  color: '#fff',
                },
              ]}
              ref={inputOptionOne}
            />
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="next"
              value={optionTwo}
              onChangeText={setOptionTwo}
              placeholder="Alternativa (B) *"
              onSubmitEditing={() => inputOptionThree.current.focus()}
              style={[
                styles.textInput,
                checked === 'b' && {
                  backgroundColor: '#11A420',
                  color: '#fff',
                },
              ]}
              ref={inputOptionTwo}
            />
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="next"
              value={optionThree}
              onChangeText={setOptionThree}
              placeholder="Alternativa (C)"
              onSubmitEditing={() => inputOptionFour.current.focus()}
              style={[
                styles.textInput,
                checked === 'c' && {
                  backgroundColor: '#11A420',
                  color: '#fff',
                },
              ]}
              ref={inputOptionThree}
            />
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="send"
              value={optionFour}
              onChangeText={setOptionFour}
              placeholder="Alternativa (D)"
              onSubmitEditing={() => handleNewChallenge(true)}
              style={[
                styles.textInput,
                checked === 'd' && {
                  backgroundColor: '#11A420',
                  color: '#fff',
                },
              ]}
              ref={inputOptionFour}
            />

            <View style={styles.response}>
              <View style={styles.headerResponse}>
                <Text style={styles.textHeaderResponse}>
                  Selecione a alternativa correta*
                </Text>
              </View>
              <View style={styles.mainResponse}>
                <RadioButton
                  value="a"
                  status={checked === 'a' ? 'checked' : 'undefined'}
                  onPress={() => setChecked('a')}
                  uncheckedColor="#fff"
                />
                <Text style={styles.textResponse}>A</Text>

                <RadioButton
                  value="b"
                  status={checked === 'b' ? 'checked' : 'undefined'}
                  onPress={() => setChecked('b')}
                  uncheckedColor="#fff"
                />
                <Text style={styles.textResponse}>B</Text>

                <RadioButton
                  value="c"
                  status={checked === 'c' ? 'checked' : 'undefined'}
                  onPress={() => setChecked('c')}
                  uncheckedColor="#fff"
                />
                <Text style={styles.textResponse}>C</Text>

                <RadioButton
                  value="d"
                  status={checked === 'd' ? 'checked' : 'undefined'}
                  onPress={() => setChecked('d')}
                  uncheckedColor="#fff"
                />
                <Text style={styles.textResponse}>D</Text>
              </View>
              <View style={styles.headerResponse}>
                <View style={styles.textHeaderResponse} />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => handleNewChallenge(true)}
              style={[styles.button, { backgroundColor: '#9AFF81' }]}
            >
              <Text style={styles.textButton}>CONFIRMAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNewChallenge(false)}
              style={styles.button}
            >
              <Text style={styles.textButton}>CANCELAR</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
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
    width: 300,
    minHeight: 300,
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
    width: 280,
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
  textInput: {
    color: '#000',
    backgroundColor: '#c4c4c4',
    width: 280,
    height: 48,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  response: {
    width: 280,
    alignItems: 'center',
    marginBottom: 10,
  },

  headerResponse: {
    width: 250,
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
    marginBottom: 10,
  },

  info: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FF5B5B',
    marginBottom: 10,
  },

  textHeaderResponse: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  mainResponse: {
    padding: 5,
    width: 280,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
  },

  textResponse: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  button: {
    width: 280,
    backgroundColor: '#FF5B5B',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewChallenge;
