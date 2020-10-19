import React, { useState, useEffect, useMemo } from 'react';
import MembersDispatch from '../../../store/dispatch/members';
import StudentMembersDispatch from '../../../store/dispatch/studentMembers';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { MaterialIcons as Icons } from '@expo/vector-icons';

function Members(props) {
  const {
    permission,
    classroomId,
    classroomSlug,
    renderNewMembers,
    handleModalNewMembers,
  } = props;
  const [members, setMembers] = useState([]);
  const [newMembers, setNewMembers] = useState(null);
  const membersDispatch = MembersDispatch();
  const { indexMembers, addMembers, removeMember } = membersDispatch;

  const studentMembersDispatch = StudentMembersDispatch();
  const { indexStudentMembers } = studentMembersDispatch;

  async function handleMembers() {
    let membersData = null;

    if (permission === 'teacher') {
      membersData = await indexMembers(classroomSlug, false);
    } else {
      membersData = await indexStudentMembers(classroomId);
    }

    if (membersData === null || membersData === members) return;

    setMembers(membersData);
  }

  async function handleAddMembers() {
    if (renderNewMembers === null) return;
    const keyNewMembers = renderNewMembers.toString() + classroomSlug;

    if (newMembers !== null && newMembers === keyNewMembers) return;

    setNewMembers(keyNewMembers);

    const responseNewMembers = await addMembers(
      classroomSlug,
      renderNewMembers
    );

    if (!responseNewMembers) return;

    await handleMembers();

    renderNewMembers = null;
  }

  function handleRemoveMember(email, username) {
    async function confirmRemove() {
      const removed = await removeMember(classroomSlug, email);

      if (removed) {
        handleMembers();
      }
    }

    Alert.alert(
      'REMOVER ALUNO',
      `Tem certeza que deseja remover ${username} ?`,
      [
        {
          text: 'NÃO',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: () => confirmRemove(),
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    handleMembers();
  }, [classroomSlug]);

  useMemo(() => {
    function newMembers() {
      if (renderNewMembers !== '') {
        handleAddMembers();
      }
    }

    newMembers();
  }, [renderNewMembers]);

  return (
    <View style={styles.boxMembers}>
      <View style={styles.headerMembers}>
        <Icons name="people" size={24} color="#fff" />
        <Text style={styles.headerText}>ALUNOS</Text>
      </View>
      {members.length > 0 ? (
        <>
          <View style={{ flex: 1 }}>
            <FlatList
              contentContainerStyle={styles.listMembers}
              data={members}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.member}>
                  <Image
                    source={{
                      uri: item.avatar,
                    }}
                    style={styles.avatarMember}
                  />
                  <Text
                    style={styles.nameMember}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {item.username}
                  </Text>
                  {permission === 'teacher' && (
                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveMember(item.email, item.username)
                      }
                      hitSlop={{
                        top: 5,
                        bottom: 5,
                        left: 5,
                        right: 5,
                      }}
                    >
                      <View style={styles.boxRemoverMember}>
                        <Icons name="delete" size={32} color="#fff" />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          </View>
        </>
      ) : (
        <View style={styles.empty}>
          {permission === 'teacher' && (
            <>
              <Text style={styles.emptyText}>Adicione alunos</Text>

              <TouchableOpacity onPress={() => handleModalNewMembers()}>
                <Icons name="add-circle-outline" size={62} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxMembers: {
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
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  headerMembers: {
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
  listMembers: {
    paddingVertical: 10,
  },
  member: {
    backgroundColor: '#f0f',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  avatarMember: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  nameMember: {
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  boxRemoverMember: {
    backgroundColor: '#fff',
    height: 60,
    width: 50,
    opacity: 0.8,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Members;
