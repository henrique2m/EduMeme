import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function Profile({ user }) {
  const navigation = useNavigation();

  async function handleSignOut() {
    navigation.navigate('navigation', { redirect: 'exit' });
  }

  return (
    <View style={StyleSheet.container}>
      {user && (
        <>
          <View style={styles.header}>
            <Image
              source={require('../../../assets/homeBackground/garota.png')}
            />
          </View>

          <View style={styles.main}>
            <Image
              style={styles.thumbnail}
              source={{
                uri: user.avatar,
              }}
            />

            <View style={styles.containerInfo}>
              {user.type === 'teacher' ? (
                <>
                  <Image
                    source={require('../../../assets/buttons/teacher/teacher.png')}
                  />
                  <Text style={styles.typeUser}>PROFESSOR</Text>
                </>
              ) : (
                <>
                  <Image
                    source={require('../../../assets/buttons/student/student.png')}
                  />
                  <Text style={styles.typeUser}>ALUNO</Text>
                </>
              )}

              <Text style={styles.nameUser}>{user.username}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.buttonText}>SAIR</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: '100%',
    height: 200,
  },

  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#fff',
    borderWidth: 5,
    backgroundColor: '#eee',
    top: -75,
  },

  containerInfo: {
    width: 248,
    height: 212,
    backgroundColor: '#8735C8',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 5,
  },

  typeUser: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },

  nameUser: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
  },

  button: {
    width: 248,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#FF9696',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Profile;
