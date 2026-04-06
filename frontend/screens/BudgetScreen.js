import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styles/Budget";

export default function BudgetScreen() {
  const [budgets, setBudgets] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");

  // 🔥 FETCH TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://192.168.1.19:5000/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 LOAD BUDGETS FROM STORAGE
  const loadBudgets = async () => {
    try {
      const data = await AsyncStorage.getItem("budgets");
      if (data) {
        setBudgets(JSON.parse(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
      loadBudgets(); // ✅ IMPORTANT
    }, [])
  );

  // 📊 CALCULATE SPENT
  const getSpent = (category) => {
    return transactions
      .filter((t) => t.category === category && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // 🎯 CATEGORY ICONS
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return { name: "restaurant", color: "#4CAF50" };
      case "Transport":
        return { name: "car", color: "#2196F3" };
      case "Bills":
        return { name: "document-text", color: "#3F51B5" };
      case "Entertainment":
        return { name: "film", color: "#9C27B0" };
      case "Shopping":
        return { name: "cart", color: "#FFC107" };
      case "Health":
        return { name: "medkit", color: "#009688" };
      case "Education":
        return { name: "school", color: "#673AB7" };
      case "Other":
        return { name: "apps", color: "#9E9E9E" };
      case "Medicine":
        return { name: "heart", color: "#E91E63" };
      case "Lunch":
        return { name: "fast-food", color: "#FF5722" };
      default:
        return { name: "wallet", color: "#6C63FF" };
    }
  };

  const categories = [
    "Food",
    "Transport",
    "Bills",
    "Entertainment",
    "Shopping",
    "Health",
    "Education",
    "Other",
    "Medicine",
    "Lunch",
  ];

  // ➕ OPEN MODAL
  const openModal = (category) => {
    setSelectedCategory(category);
    setAmount(budgets[category]?.toString() || "");
    setModalVisible(true);
  };

  // 💾 SAVE BUDGET
  const saveBudget = async () => {
    const updated = {
      ...budgets,
      [selectedCategory]: Number(amount),
    };

    setBudgets(updated);

    // 🔥 SAVE TO STORAGE
    await AsyncStorage.setItem("budgets", JSON.stringify(updated));

    setModalVisible(false);
  };

  // ❌ DELETE BUDGET
  const removeBudget = async (category) => {
    const updated = { ...budgets };
    delete updated[category];

    setBudgets(updated);

    await AsyncStorage.setItem("budgets", JSON.stringify(updated));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Budget Planner</Text>

        {categories.map((cat) => {
          const spent = getSpent(cat);
          const budget = budgets[cat] || 0;

          return (
            <View key={cat} style={styles.card}>

              {/* HEADER */}
              <View style={styles.row}>

                <View style={styles.leftRow}>
                  <View
                    style={[
                      styles.iconBox,
                      { backgroundColor: getCategoryIcon(cat).color },
                    ]}
                  >
                    <Ionicons
                      name={getCategoryIcon(cat).name}
                      size={18}
                      color="#fff"
                    />
                  </View>

                  <Text style={styles.category}>{cat}</Text>
                </View>

                <Text style={styles.amount}>
                  ₹{spent} / ₹{budget || 0}
                </Text>
              </View>

              {/* PROGRESS BAR */}
              {budget > 0 && (
                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min((spent / budget) * 100, 100)}%`,
                        backgroundColor:
                          spent > budget ? "#ef4444" : "#4CAF50",
                      },
                    ]}
                  />
                </View>
              )}

              {/* BUTTONS */}
              {budget > 0 ? (
                <View style={styles.btnRow}>
                  <TouchableOpacity
                    style={styles.updateBtn}
                    onPress={() => openModal(cat)}
                  >
                    <Ionicons name="create-outline" size={16} color="#fff" />
                    <Text style={styles.btnText}> Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => removeBudget(cat)}
                  >
                    <Ionicons name="trash-outline" size={16} color="#fff" />
                    <Text style={styles.btnText}> Remove</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => openModal(cat)}
                >
                  <Ionicons name="add-circle-outline" size={18} color="#fff" />
                  <Text style={styles.btnText}> Add Budget</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>
              Set Budget for {selectedCategory}
            </Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
            />

            <View style={styles.modalBtns}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={saveBudget}>
                <Text style={{ color: "#6C63FF", fontWeight: "bold" }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}