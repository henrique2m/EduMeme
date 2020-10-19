import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons as Icons } from '@expo/vector-icons';

import ClassroomDispatch from '../../../store/dispatch/classrooms';

function ActionsTeacher(props) {
  const {
    handleModalNewChallenge,
    handleModalNewMembers,
    handleDeletedClassroom,
    handleReloadClassrooms,
    classroomId,
  } = props;
  const classroomDispatch = ClassroomDispatch();
  const { deleteClassroom } = classroomDispatch;

  function handleDeleteClassroom() {
    async function confirmDelete() {
      const deleted = await deleteClassroom(classroomId);
      if (deleted) {
        handleDeletedClassroom();
        handleReloadClassrooms(classroomId);
      }
    }

    Alert.alert(
      'EXCLUIR SALA',
      'Tem certeza que deseja excluir está sala?',
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

  return (
    <View style={styles.boxActions}>
      <View style={styles.headerActions}>
        <Icons name="settings" size={24} color="#fff" />
        <Text style={styles.headerText}>AÇÕES</Text>
      </View>

      <View style={styles.boxButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleModalNewChallenge()}
        >
          <Text style={styles.textButton}>CRIAR DESAFIO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleModalNewMembers()}
        >
          <Text style={styles.textButton}>ADICIONAR ALUNO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff9696' }]}
          onPress={() => handleDeleteClassroom()}
        >
          <Text style={styles.textButton}>EXCLUIR SALA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxActions: {
    width: 344,
    height: 262,
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
    padding: 10,
  },
  headerActions: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginLeft: 5,
  },
  boxButtons: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    width: 256,
    height: 48,
    backgroundColor: '#8735C8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ActionsTeacher;
