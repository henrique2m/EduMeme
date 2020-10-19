import AsyncStorage from '@react-native-community/async-storage';

function Auth() {
  const auth = {};

  async function setStateAuth(nameState, value) {
    await AsyncStorage.setItem(`@eduMeme:${String(nameState)}`, String(value));
  }

  async function getStateAuth(nameState) {
    const state = await AsyncStorage.getItem(`@eduMeme:${String(nameState)}`);
    return state;
  }

  async function generateStateInitial() {
    await setStateAuth('isLoading', true);
    await setStateAuth('userToken', null);
    await setStateAuth('register', null);
    await setStateAuth('userDataRegister', null);
    await setStateAuth('home', null);
    return;
  }

  async function updateIsLoading(value) {
    await setStateAuth('isLoading', value);
    return;
  }

  async function getIsLoading() {
    const isLoading = await getStateAuth('isLoading');
    return isLoading;
  }

  async function updateUserToken(value) {
    await setStateAuth('userToken', value);
    return;
  }

  async function getUserToken() {
    const userToken = await getStateAuth('userToken');
    return userToken;
  }

  async function getRegister() {
    const register = await getStateAuth('register');
    return register;
  }

  async function updateRegister(value) {
    await setStateAuth('register', value);
    return;
  }

  async function getHome() {
    const home = await getStateAuth('home');
    return home;
  }

  async function updateHome(value) {
    await setStateAuth('home', value);
    return;
  }

  async function updateUserDataRegister(value) {
    await setStateAuth('userDataRegister', value);
    return;
  }

  async function getUserDataRegister() {
    const userDataRegister = await getStateAuth('userDataRegister');
    return userDataRegister;
  }

  async function signOut() {
    await AsyncStorage.clear();
    return true;
  }

  auth.generateStateInitial = generateStateInitial;

  auth.getIsLoading = getIsLoading;
  auth.updateIsLoading = updateIsLoading;

  auth.getUserToken = getUserToken;
  auth.updateUserToken = updateUserToken;

  auth.getRegister = getRegister;
  auth.updateRegister = updateRegister;

  auth.getHome = getHome;
  auth.updateHome = updateHome;

  auth.getUserDataRegister = getUserDataRegister;
  auth.updateUserDataRegister = updateUserDataRegister;

  auth.signOut = signOut;

  return auth;
}
export default Auth;
