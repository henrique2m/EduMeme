import * as Facebook from 'expo-facebook';

async function signInFacebook(appId) {
  const authFacebook = {};
  authFacebook.status = true;
  try {
    await Facebook.initializeAsync({ appId: appId });

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });

    if (type === 'cancel') {
      authFacebook.status = false;
      authFacebook.error = { code: 'NOT-AUTHORIZATION' };
      return authFacebook;
    }

    const responseFacebook = await fetch(
      `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${token}`
    );

    const data = await responseFacebook.json();

    authFacebook.data = { ...data, tokenFacebook: token };
  } catch ({ message }) {
    authFacebook.status = false;
    authFacebook.error = { code: 'EXCEPTION-AUTHORIZATION', massage: message };
  }

  return authFacebook;
}

export default {
  signInFacebook,
};
