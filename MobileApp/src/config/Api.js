import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://192.168.1.4:8000";
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

    // Intercept 503 Maintenance Mode and return empty data gracefully
    if (response.status === 503) {
      try {
        const clonedResponse = response.clone();
        const data = await clonedResponse.json();
        if (data.maintenance_mode === 'FULL_MAINTENANCE' || data.maintenance_mode === 'READ_ONLY') {
          if (global.triggerMaintenanceCheck) {
            global.triggerMaintenanceCheck();
          }
          return new Response(
            JSON.stringify({
              success: true,
              data: [],
              message: data.message || "Maintenance Mode"
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
      } catch (e) {
        console.log("Error checking maintenance mode", e);
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export default BASE_URL;
