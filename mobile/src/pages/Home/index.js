import React, { useEffect, useState } from 'react';
import UserDispatch from '../../store/dispatch/user';
import AuthActions from '../../store/actions/auth';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

import { MaterialIcons as Icons } from '@expo/vector-icons';

import SideMenu from 'react-native-side-menu';

import Teacher from '../components/Teacher';
import Student from '../components/Student';
import Profile from '../components/Profile';
import Classroom from '../components/Classroom';
import NewClassroom from '../components/NewClassroom';
import NewChallenge from '../components/NewChallenge';
import Challenge from '../components/Challenge';
import NewMembers from '../components/NewMembers';
import Loading from '../components/Loading';

function Home() {
  const [stateModalClassroom, setStateModalClassroom] = useState(false);
  const [stateModalChallenge, setStateModalChallenge] = useState(false);
  const [reloadChallenges, setReloadChallenges] = useState(null);
  const [reloadClassrooms, setReloadClassrooms] = useState(null);
  const [stateModalMembers, setStateModalMembers] = useState(false);
  const [classroomSlug, setClassroomSlug] = useState(null);
  const [classroomId, setClassroomId] = useState(null);
  const [newClassroom, setNewClassroom] = useState('');
  const [newChallenge, setNewChallenge] = useState('');
  const [newMembers, setNewMembers] = useState('');
  const [challenge, setChallenge] = useState('');
  const [leftOpen, setLeftOpen] = useState(false);
  const [page, setPage] = useState('Profile');
  const [user, setUser] = useState(null);

  const [
    stateModalResponseChallenge,
    setStateModalResponseChallenge,
  ] = useState(false);

  const userDispatch = UserDispatch();
  const authActions = AuthActions();
  const { userPersist } = userDispatch;
  const { getUserToken } = authActions;

  useEffect(() => {
    async function handleUser() {
      const userToken = await getUserToken();

      if (userToken.length > 10) {
        const data = await userPersist();

        if (data) {
          setUser(data);
        }
      }
    }
    handleUser();
  }, []);

  function toggleLeftMenu(isOpen) {
    setLeftOpen(isOpen);
  }

  function toggleModalNewClassroom(userAction, data) {
    if (userAction) {
      setNewClassroom(data);
    }
    setStateModalClassroom(!stateModalClassroom);
  }

  function toggleModalNewChallenge(userAction, data) {
    if (userAction) {
      setNewChallenge(data);
    }
    setStateModalChallenge(!stateModalChallenge);
  }

  function toggleModalResponseChallenge(userAction, data) {
    if (userAction && data !== null) {
      if (data.reloadChallenges !== undefined) {
        setReloadChallenges(data.reloadChallenges);
      } else {
        setChallenge(data);
      }
    }

    setStateModalResponseChallenge(!stateModalResponseChallenge);
  }

  function toggleModalNewMembers(userAction, data) {
    if (userAction) {
      setNewMembers(data);
    }
    setStateModalMembers(!stateModalMembers);
  }

  function handlePaginationMain(page, { slug, id }) {
    switch (page) {
      case 'Profile':
        setPage(page);
        break;
      case 'Classroom':
        setLeftOpen(false);
        setClassroomId(id);
        setClassroomSlug(slug);
        setPage(page);
    }
  }

  function handleReloadClassrooms(classroomID) {
    setReloadClassrooms(classroomID);
  }

  function handleResetStateChallenge() {
    setNewChallenge('');
  }

  return (
    <SafeAreaView style={styles.containerMenu}>
      {user !== null ? (
        <SideMenu
          isOpen={leftOpen}
          openMenuOffset={287}
          onChange={(isOpen) => toggleLeftMenu(isOpen)}
          menu={
            user.type === 'teacher' ? (
              <Teacher
                toggleModalNewClassroom={() => toggleModalNewClassroom()}
                handlePaginationMain={(page, id) =>
                  handlePaginationMain(page, id)
                }
                renderNewClassroom={newClassroom}
                renderClassrooms={reloadClassrooms}
              />
            ) : (
              <Student
                handlePaginationMain={(page, id) =>
                  handlePaginationMain(page, id)
                }
              />
            )
          }
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                hitSlop={{
                  top: 5,
                  bottom: 5,
                  left: 5,
                  right: 5,
                }}
                onPress={() => {
                  toggleLeftMenu(true);
                }}
              >
                <Icons name="menu" size={24} color="#fff" />
              </TouchableOpacity>
              <Image
                source={require('../../assets/icon/icon.png')}
                style={{ width: 40, height: 40 }}
              />
              <TouchableOpacity
                hitSlop={{
                  top: 5,
                  bottom: 5,
                  left: 5,
                  right: 5,
                }}
                onPress={() =>
                  handlePaginationMain('Profile', { slug: null, id: null })
                }
              >
                <Icons name="person" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.main}>
              {page === 'Profile' && <Profile user={user} />}

              {page === 'Classroom' && (
                <Classroom
                  permission={user.type}
                  classroomId={classroomId}
                  toggleModalNewChallenge={() => toggleModalNewChallenge()}
                  toggleModalNewMembers={() => toggleModalNewMembers()}
                  toggleModalResponseChallenge={(userAction, data) =>
                    toggleModalResponseChallenge(userAction, data)
                  }
                  handleReloadClassrooms={(classroomID) =>
                    handleReloadClassrooms(classroomID)
                  }
                  handleResetStateChallenge={() => handleResetStateChallenge()}
                  renderNewChallenge={newChallenge}
                  renderNewMembers={newMembers}
                  renderChallenges={reloadChallenges}
                />
              )}
            </View>
          </View>
        </SideMenu>
      ) : (
        <Loading />
      )}

      {stateModalClassroom && (
        <NewClassroom
          visible={stateModalClassroom}
          toggleModalNewClassroom={(userAction, data) =>
            toggleModalNewClassroom(userAction, data)
          }
        />
      )}

      {stateModalChallenge && (
        <NewChallenge
          visible={stateModalChallenge}
          toggleModalNewChallenge={(userAction, data) =>
            toggleModalNewChallenge(userAction, data)
          }
        />
      )}

      {stateModalMembers && (
        <NewMembers
          visible={stateModalMembers}
          classroomSlug={classroomSlug}
          permission={user.type}
          toggleModalNewMembers={(userAction, data) =>
            toggleModalNewMembers(userAction, data)
          }
        />
      )}

      {stateModalResponseChallenge && (
        <Challenge
          visible={stateModalResponseChallenge}
          permission={user.type}
          renderChallenge={challenge}
          toggleModalResponseChallenge={(userAction, data) =>
            toggleModalResponseChallenge(userAction, data)
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerMenu: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#8735C8',
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },

  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;
