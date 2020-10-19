import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import AuthDispatch from '../../store/dispatch/auth';
import { useNavigation } from '@react-navigation/native';

import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import Loading from '../components/Loading';

function LoginWithFacebook() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const authDispatch = AuthDispatch();

  const { signIn } = authDispatch;

  async function handleSignIn() {
    setLoading(true);
    const response = await signIn();

    if (!response) {
      setLoading(false);
      return;
    }

    const { register, login } = response;

    if (register) {
      navigation.navigate('navigation', { redirect: 'register' });
    }

    if (login) {
      navigation.navigate('navigation', { redirect: 'home' });
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <>
          <View style={styles.header}>
            <Image
              style={styles.imageTop}
              source={require('../../assets/loginBackground/pensador.png')}
            />
          </View>
          <View style={styles.footer}>
            <Image
              style={styles.imageLogo}
              source={require('../../assets/logo/logo.png')}
            />

            <RectButton
              title="Login"
              style={styles.button}
              onPress={handleSignIn}
            >
              <Text style={styles.buttonText}>ENTRAR COM FACEBOOK</Text>
            </RectButton>
          </View>
        </>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'flex-end',
  },
  header: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageTop: {
    flex: 1,
  },
  footer: {
    height: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    marginBottom: 42,
  },
  button: {
    backgroundColor: '#7E25D9',
    width: 348,
    height: 48,
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginWithFacebook;
