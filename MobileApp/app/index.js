import { useEffect } from "react";
import { LogBox } from "react-native";

import { BookingProvider } from "@/src/context/BookingContext";
import { TenantProvider } from "@/src/context/TenantContext";
import { LanguageProvider } from "@/src/utils/LanguageContext";
import MainNavigator from "@/src/navigation/MainNavigator";




import {
  registerForPushNotificationsAsync,
} from "@/src/utils/PushNotificationService";

LogBox.ignoreLogs([
  "setLayoutAnimationEnabledExperimental is currently a no-op",
  "Unable to activate keep awake",
  "Expo AV has been deprecated"
]);

// Global override to remove all console prints as requested
if (true) {
  console.log = () => {};
  console.info = () => {};
}

if (
  typeof window !== "undefined" &&
  typeof window.addEventListener === "function"
) {
  window.addEventListener("unhandledrejection", (event) => {
    if (
      event.reason &&
      event.reason.message &&
      event.reason.message.includes("keep awake")
    ) {
      event.preventDefault();
    }
  });
}

import { OwnerAccountProvider } from "@/src/context/OwnerAccountContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {

  useEffect(() => {

   

    const getPushToken = async () => {

      const token =
        await registerForPushNotificationsAsync();



    };

    getPushToken();

  }, []);

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <BookingProvider>
          <TenantProvider>
            <OwnerAccountProvider>
              <MainNavigator />
            </OwnerAccountProvider>
          </TenantProvider>
        </BookingProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}