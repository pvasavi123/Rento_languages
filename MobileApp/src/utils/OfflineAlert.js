import { Alert } from 'react-native';

export const showOfflineAlert = () => {
  Alert.alert(
    "Connection Offline",
    "Internet connection is required for this action.",
    [{ text: "OK" }],
    { cancelable: true }
  );
};

export default {
  showOfflineAlert
};
