import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import InsightsScreen from "../screens/InsightsScreen";
import BudgetScreen from "../screens/BudgetScreen";
import IncomeScreen from "../screens/IncomeScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import TransactionDetailScreen from "../screens/TranscationScreen";
import BudegetCategoryScreen from "../screens/BudgetCatergoryScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// ✅ HOME STACK
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right", // smooth navigation
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Income" component={IncomeScreen} />
      <Stack.Screen name="Expense" component={ExpenseScreen} />

      {/* ✅ IMPORTANT SCREEN */}
      <Stack.Screen
        name="CategoryDetail"
        component={BudegetCategoryScreen}
      />
    </Stack.Navigator>
  );
}


// ✅ HISTORY STACK
function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryMain" component={HistoryScreen} />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
      />
      <Stack.Screen name="Expense" component={ExpenseScreen} />
      <Stack.Screen name="Income" component={IncomeScreen} />
    </Stack.Navigator>
  );
}


// ✅ MAIN NAVIGATOR
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>

        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="History"
          component={HistoryStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Analytics"
          component={InsightsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Goal"
          component={BudgetScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="flag" size={size} color={color} />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}