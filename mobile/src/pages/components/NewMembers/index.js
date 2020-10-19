import React, { useState, useEffect } from 'react';
import MembersDispatch from '../../../store/dispatch/members';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons as Icons } from '@expo/vector-icons';
import { MaterialCommunityIcons as CommunityIcons } from '@expo/vector-icons';

function NewMembers(props) {
  const { visible, toggleModalNewMembers, classroomSlug, permission } = props;
  const [members, setMembers] = useState([]);
  const [addMembers, setAddMembers] = useState([]);
  const [info, setInfo] = useState('');
  const membersDispatch = MembersDispatch();
  const { indexMembers } = membersDispatch;

  async function handleMembers() {
    const membersData = await indexMembers(classroomSlug, true);
    if (membersData === members) return;

    membersData.map((member) => {
      member.add = false;
    });

    setMembers(membersData);
  }

  function handleAddMembers(member) {
    setInfo('');
    const { add, id, email, username, avatar } = member;

    const emailMember = addMembers.indexOf(email);

    let toggleMembers = addMembers;

    if (emailMember === -1) {
      //add
      toggleMembers = [...toggleMembers, email];
    } else {
      //remove
      toggleMembers.splice(emailMember, 1);
    }

    const membersData = members.filter((newMembers) => {
      return newMembers;
    });

    const indexMember = membersData.indexOf(member);

    membersData.splice(indexMember, 1, {
      add: !add,
      id,
      email,
      username,
      avatar,
    });

    setMembers(membersData);
    setAddMembers(toggleMembers);
  }

  useEffect(() => {
    handleMembers();
  }, [classroomSlug]);

  function handleNewMembers(userAction) {
    if (userAction && addMembers.length === 0) {
      setInfo('Selecione ao menos um aluno.');
      return;
    }

    const data = userAction ? addMembers : null;

    toggleModalNewMembers(userAction, data);
    setAddMembers([]);
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Icons name="add" size={24} color="#000" />
              <Text style={styles.headerText}>NOVO ALUNO</Text>
            </View>
            {info !== '' && <Text style={styles.info}>{info}</Text>}
            {members.length > 0 ? (
              <FlatList
                contentContainerStyle={styles.listMembers}
                data={members}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <View
                    style={[
                      styles.member,
                      item.add && { backgroundColor: '#9AFF81' },
                    ]}
                  >
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
                        onPress={() => handleAddMembers(item)}
                        hitSlop={{
                          top: 5,
                          bottom: 5,
                          left: 5,
                          right: 5,
                        }}
                      >
                        <View style={styles.boxRemoverMember}>
                          {!item.add ? (
                            <Icons name="person-add" size={32} color="#fff" />
                          ) : (
                            <CommunityIcons
                              name="account-remove"
                              size={32}
                              color="#FF5B5B"
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              />
            ) : (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>
                  Não foram encontrados alunos para serem adicionados.
                </Text>
                <TouchableOpacity
                  onPress={() => handleNewMembers(false)}
                  style={[styles.button, { backgroundColor: '#f0f' }]}
                >
                  <Text style={styles.textButton}>VOLTAR</Text>
                </TouchableOpacity>
              </View>
            )}

            {members.length > 0 && (
              <>
                <TouchableOpacity
                  onPress={() => handleNewMembers(true)}
                  style={[styles.button, { backgroundColor: '#9AFF81' }]}
                >
                  <Text style={styles.textButton}>CONFIRMAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNewMembers(false)}
                  style={styles.button}
                >
                  <Text style={styles.textButton}>CANCELAR</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
    maxHeight: 500,
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
  info: {
    fontWeight: 'bold',
    color: '#FF5B5B',
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  listMembers: {
    padding: 5,
  },
  member: {
    width: 260,
    backgroundColor: '#f0f',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    borderRadius: 10,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  button: {
    width: 280,
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

export default NewMembers;
