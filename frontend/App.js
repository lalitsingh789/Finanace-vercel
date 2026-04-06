import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import { FinanceProvider } from "./context/FinanceContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <FinanceProvider>   
        <AppNavigator />
      </FinanceProvider>
    </SafeAreaProvider>
  );
}