import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/Goal";

export default function GoalScreen() {
  const [goal, setGoal] = useState(5000);
  const [saved, setSaved] = useState(1200);

  const progress = (saved / goal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Savings Goal</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Monthly Target</Text>
        <Text style={styles.amount}>₹{goal}</Text>

        <Text>Saved: ₹{saved}</Text>

        {/* Progress */}
        <View style={styles.progressBg}>
          <View
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>

        <Button
          title="Save ₹500"
          onPress={() => setSaved(saved + 500)}
        />
      </View>
    </SafeAreaView>
  );
}