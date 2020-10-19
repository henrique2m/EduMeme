import React, { useEffect, useMemo, useState } from 'react';
import ClassroomDispatch from '../../../store/dispatch/classrooms';
import { MaterialIcons as Icons } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

function Teacher(props) {
  const {
    toggleModalNewClassroom,
    renderNewClassroom,
    handlePaginationMain,
    renderClassrooms,
  } = props;

  const [classrooms, setClassrooms] = useState([]);
  const classroomDispatch = ClassroomDispatch();
  const [newClassroom, setNewClassroom] = useState(null);

  const { indexClassroom, createClassroom } = classroomDispatch;

  async function handleClassrooms() {
    const classroomsData = await indexClassroom();
    if (classroomsData === classrooms) return;

    setClassrooms(classroomsData);
  }

  async function handleCreateClassroom() {
    if (renderNewClassroom === null) return;

    const { name, description } = renderNewClassroom;

    const keyNewClassroom = String(name + description);

    if (newClassroom !== null && newClassroom === keyNewClassroom) return;

    setNewClassroom(keyNewClassroom);

    const responseNewClassroom = await createClassroom(name, description);

    if (!responseNewClassroom) return;

    await handleClassrooms();

    renderNewClassroom = null;
  }

  useEffect(() => {
    handleClassrooms();
  }, []);

  useMemo(() => {
    function newClassroom() {
      if (renderNewClassroom !== '') {
        handleCreateClassroom();
      }
    }

    newClassroom();
  }, [renderNewClassroom]);

  useMemo(() => {
    handleClassrooms();
  }, [renderClassrooms]);

  function handleModalNewClassroom() {
    toggleModalNewClassroom();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerText}>PROFESSOR</Text>
        <Icons name="record-voice-over" size={24} color="#fff" />
      </View>
      {classrooms.length > 0 ? (
        <>
          <View style={styles.boxButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleModalNewClassroom}
            >
              <Text style={styles.buttonText}> NOVA SALA </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Icons name="account-balance" size={24} color="#fff" />
            <Text style={[styles.headerText, { left: -50 }]}>MINHAS SALAS</Text>
            <View />
          </View>

          <FlatList
            contentContainerStyle={styles.listClassroom}
            data={classrooms}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.classroom}>
                <TouchableOpacity
                  style={styles.classroomButton}
                  onPress={() =>
                    handlePaginationMain('Classroom', {
                      slug: item.slug,
                      id: item.id,
                    })
                  }
                >
                  <Image
                    style={styles.avatarClassroom}
                    source={{
                      uri: `https://api.adorable.io/avatars/100/${item.slug}`,
                    }}
                  />
                  <Text style={styles.nameClassroom}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}> Crie uma nova sala </Text>

          <TouchableOpacity onPress={handleModalNewClassroom}>
            <Icons name="add-circle-outline" size={62} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  header: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },

  boxButton: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: 150,
    height: 32,
    backgroundColor: '#8735C8',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  listClassroom: {
    paddingVertical: 10,
    backgroundColor: '#000',
  },

  classroom: {
    justifyContent: 'center',
    height: 70,
  },

  classroomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 232,
    height: 60,
    backgroundColor: '#fff',
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    left: 30,
    paddingLeft: 5,
  },

  avatarClassroom: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  nameClassroom: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    left: 10,
  },
});

export default Teacher;
