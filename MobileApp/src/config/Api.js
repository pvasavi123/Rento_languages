import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://192.168.1.20:8000";
// const BASE_URL = "https://api.rennto.in";

export const WS_BASE_URL = BASE_URL
  .replace("http://", "ws://")
  .replace("https://", "wss://");

export const fetchWithAuth = async (url, options = {}) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const selectedAccountId = await AsyncStorage.getItem("selectedAccountId");
    const headers = { ...(options.headers || {}) };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (selectedAccountId) {
      headers["X-Owner-Account-ID"] = selectedAccountId;
    }

    const config = { ...options, headers };
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export default BASE_URL;
