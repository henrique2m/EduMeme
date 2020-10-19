import AsyncStorage from '@react-native-community/async-storage';

function User() {
  const user = {};

  async function setUser(data) {
    const dataEncode = JSON.stringify(data);
    const dataUser = await AsyncStorage.setItem(
      '@eduMeme:dataUser',
      dataEncode
    );
    return dataUser;
  }

  async function getUser() {
    const dataUser = await AsyncStorage.getItem('@eduMeme:dataUser');
    const dataDecode = JSON.parse(dataUser);
    return dataDecode;
  }

  user.setUser = setUser;
  user.getUser = getUser;

  return user;
}

export default User;
