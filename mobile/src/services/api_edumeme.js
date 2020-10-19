import axios from 'axios';

const apiEdumeme = axios.create({
  baseURL: process.env.EXPO_API_EDUMEME,
});

export default apiEdumeme;
