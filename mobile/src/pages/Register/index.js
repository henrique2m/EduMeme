import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import AuthDispatch from '../../store/dispatch/auth';
import AuthActions from '../../store/actions/auth';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

import Loading from '../components/Loading';

function Register() {
  const [teacherY] = useState(new Animated.Value(50));
  const [studentY] = useState(new Animated.Value(50));
  const [user, setUser] = useState('');

  const navigation = useNavigation();
  const authActions = AuthActions();
  const authDispatch = AuthDispatch();

  const { signUp } = authDispatch;
  const { getUserDataRegister } = authActions;

  useEffect(() => {
    async function handleUser() {
      const dataUserRegister = await getUserDataRegister();
      const dataUserDecode = JSON.parse(dataUserRegister);

      setUser(dataUserDecode);
    }

    function overlapping(element, toValue, bounciness) {
      Animated.spring(element, {
        toValue: toValue,
        bounciness: bounciness,
        useNativeDriver: false,
      }).start();
    }
    handleUser();
    overlapping(teacherY, 0, 30);
    overlapping(studentY, 0, 30);
  }, []);

  async function handleUserRegister(type) {
    const dataUser = { ...user, type };
    const response = await signUp(dataUser);

    const { login } = response;

    if (login) {
      navigation.navigate('navigation', { redirect: 'signUp-home' });
      return;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {user !== '' ? (
        <>
          <View style={styles.header}>
            <Image
              source={require('../../assets/registerBackground/dog.png')}
            />
          </View>
          <View style={styles.footer}>
            <Image
              style={styles.thumbnailUser}
              source={{ uri: user.picture.data.url }}
            />
            <Text style={styles.textFooter}>
              Olá <Text style={{ color: '#8735C8' }}>{user.name}</Text>, você
              deseja entrar como professor ou aluno?
            </Text>
            <View style={styles.containerButtons}>
              <Animated.View style={{ top: teacherY }}>
                <RectButton
                  style={styles.button}
                  onPress={() => {
                    handleUserRegister('teacher');
                  }}
                >
                  <Image
                    source={require('../../assets/buttons/teacher/teacher.png')}
                  />
                  <Text style={styles.textButton}> PROFESSOR </Text>
                </RectButton>
              </Animated.View>
              <Animated.View style={{ top: studentY }}>
                <RectButton
                  style={styles.button}
                  onPress={() => handleUserRegister('student')}
                >
                  <Image
                    source={require('../../assets/buttons/student/student.png')}
                  />
                  <Text style={styles.textButton}>ALUNO</Text>
                </RectButton>
              </Animated.View>
            </View>
          </View>
        </>
      ) : (
        <View>
          <Loading />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },

  header: {
    flex: 1,
  },

  footer: {
    height: 416,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
  },

  thumbnailUser: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#fff',
    borderWidth: 5,
  },

  textFooter: {
    height: 120,
    width: 300,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  containerButtons: {
    minWidth: 400,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  button: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#8735C8',
    overflow: 'hidden',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Register;
