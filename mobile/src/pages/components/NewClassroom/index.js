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
import { MaterialIcons as Icons } from '@expo/vector-icons';

function NewClassroom({ visible, toggleModalNewClassroom }) {
  const inputDescription = useRef(null);
  const [info, setInfo] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNewClassroom(userAction) {
    if (name === '' && userAction) {
      setInfo('O campo Nome é obrigatório.');
      return;
    }

    const data = userAction ? { name: name, description: description } : null;

    toggleModalNewClassroom(userAction, data);
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
              <Text style={styles.headerText}>NOVA SALA</Text>
            </View>
            {info !== '' && <Text style={styles.info}>{info}</Text>}
            <TextInput
              autoFocus
              underlineColorAndroid="transparent"
              returnKeyType="next"
              value={name}
              onChangeText={setName}
              placeholder="Nome*"
              onSubmitEditing={() => inputDescription.current.focus()}
              style={styles.textInput}
            />
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="send"
              value={description}
              onChangeText={setDescription}
              placeholder="Descrição"
              onSubmitEditing={() => handleNewClassroom(true)}
              style={styles.textInput}
              ref={inputDescription}
            />
            <TouchableOpacity
              onPress={() => handleNewClassroom(true)}
              style={[styles.button, { backgroundColor: '#9AFF81' }]}
            >
              <Text style={styles.textButton}>CONFIRMAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNewClassroom(false)}
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
    height: 300,
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

  info: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FF5B5B',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#c4c4c4',
    width: 280,
    height: 48,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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

export default NewClassroom;
