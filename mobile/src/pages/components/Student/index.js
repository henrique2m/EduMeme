import React, { useEffect, useMemo, useState } from 'react';
import StudentDispatch from '../../../store/dispatch/studentClassroom';
import {
  MaterialIcons as Icons,
  MaterialCommunityIcons as CommunityIcons,
} from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Loading from '../Loading';

function Student(props) {
  const { handlePaginationMain } = props;

  const [loading, setLoading] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const studentDispatch = StudentDispatch();

  const { indexStudentClassroom } = studentDispatch;

  async function handleClassrooms() {
    setLoading(true);
    const classroomsData = await indexStudentClassroom();
    if (classroomsData === classrooms) return;

    setClassrooms(classroomsData);
    setLoading(false);
  }

  useEffect(() => {
    handleClassrooms();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerText}>ALUNO</Text>
        <Icons name="face" size={24} color="#fff" />
      </View>
      {classrooms.length > 0 && loading === false ? (
        <>
          <View style={styles.header}>
            <Icons name="account-balance" size={24} color="#fff" />
            <Text style={[styles.headerText, { left: -80 }]}>SALAS</Text>
            <View />
          </View>

          <FlatList
            contentContainerStyle={styles.listClassroom}
            data={classrooms}
            keyExtractor={(item) => String(item.classroom.id)}
            renderItem={({ item }) => (
              <View style={styles.classroom}>
                <TouchableOpacity
                  style={styles.classroomButton}
                  onPress={() =>
                    handlePaginationMain('Classroom', {
                      slug: item.classroom.slug,
                      id: item.classroom.id,
                    })
                  }
                >
                  <Image
                    style={styles.avatarClassroom}
                    source={{
                      uri: `https://api.adorable.io/avatars/100/${item.classroom.slug}`,
                    }}
                  />
                  <Text style={styles.nameClassroom}>
                    {item.classroom.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <>
          {loading ? (
            <View style={styles.empty}>
              <Loading />
            </View>
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                Você ainda não foi adicionado a nenhuma sala
              </Text>
              <TouchableOpacity onPress={handleClassrooms}>
                <CommunityIcons name="reload" size={42} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </>
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
    padding: 50,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 24,
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

export default Student;
