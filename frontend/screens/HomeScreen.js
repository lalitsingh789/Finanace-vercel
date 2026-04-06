import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styles/Home";

export default function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState({});

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.1.19:5000/api/transactions");
      const data = await response.json();
      setTransactions(data.reverse());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // LOAD BUDGETS
  const loadBudgets = async () => {
    const data = await AsyncStorage.getItem("budgets");
    if (data) setBudgets(JSON.parse(data));
    else setBudgets({});
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
      loadBudgets();
    }, [])
  );

  // CALCULATIONS
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const recentTransactions = transactions.slice(0, 3);

  const getSpent = (cat) => {
    return transactions
      .filter((t) => t.category === cat && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return "restaurant";
      case "Transport":
        return "car";
      case "Bills":
        return "document-text";
      case "Shopping":
        return "cart";
      case "Health":
        return "medkit";
      default:
        return "wallet";
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.topHeader}>
          <Text style={styles.appTitle}>Finance Manager</Text>
        </View>

        {/* BALANCE CARD */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceTopRow}>
            <View style={styles.balanceLeft}>
              <Ionicons name="wallet-outline" size={20} color="#fff" />
              <Text style={styles.cardTitle}>Current Balance</Text>
            </View>
          </View>

          <Text style={styles.balanceAmount}>
            ₹ {balance.toFixed(2)}
          </Text>

          <View style={styles.balanceBottomRow}>
            <View style={styles.incomeBox}>
              <Ionicons name="trending-up" size={25} color="#4ade80" />
              <View>
                <Text style={styles.incomeText}>Income</Text>
                <Text style={styles.incomeAmount}>
                  ₹ {totalIncome.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.expenseBox}>
              <Ionicons name="trending-down" size={25} color="#f87171" />
              <View>
                <Text style={styles.expenseText}>Expenses</Text>
                <Text style={styles.expenseAmount}>
                  ₹ {totalExpense.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 🔥 ADD INCOME / EXPENSE BUTTONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("Income")}
          >
            <View style={styles.incomeIcon}>
              <Ionicons name="arrow-down" size={22} color="#fff" />
            </View>
            <Text style={styles.actionText}>Add Income</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("Expense")}
          >
            <View style={styles.expenseIcon}>
              <Ionicons name="arrow-up" size={22} color="#fff" />
            </View>
            <Text style={styles.actionText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        {/* TRANSACTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("History")}
          >
            See All
          </Text>
        </View>

        {recentTransactions.map((item) => (
          <View key={item._id} style={styles.transactionCard}>
            <View style={styles.txLeft}>
              <View style={styles.txIcon}>
                <Ionicons
                  name={item.type === "income" ? "arrow-down" : "arrow-up"}
                  size={18}
                  color="#fff"
                />
              </View>

              <View>
                <Text style={styles.txTitle}>
                  {item.note || "Transaction"}
                </Text>
                <Text style={styles.txCategory}>{item.category}</Text>
              </View>
            </View>

            <Text
              style={[
                styles.txAmount,
                {
                  color:
                    item.type === "income" ? "#22c55e" : "#ef4444",
                },
              ]}
            >
              {item.type === "income" ? "+" : "-"}₹{item.amount}
            </Text>
          </View>
        ))}

        {/* BUDGET SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budget Status</Text>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Goal")}
          >
            Edit
          </Text>
        </View>

        {/* EMPTY STATE */}
        {Object.keys(budgets).length === 0 ? (
          <View style={styles.emptyBudget}>
            <Ionicons name="wallet-outline" size={42} color="#a78bfa" />

            <Text style={styles.emptyText}>
              No Budgets Configured
            </Text>

            <Text style={styles.emptySub}>
              Set monthly budget limits to track your spending
            </Text>

            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => navigation.navigate("Goal")}
            >
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.createText}>Create Budget</Text>
            </TouchableOpacity>
          </View>
        ) : (
          Object.keys(budgets).map((cat) => {
            const spent = getSpent(cat);
            const budget = budgets[cat];
            const percent = Math.min((spent / budget) * 100, 100);

            return (
              <TouchableOpacity
                key={cat}
                style={styles.budgetCard}
                onPress={() =>
                  navigation.navigate("CategoryDetail", { category: cat })
                }
              >
                <View style={styles.budgetHeader}>
                  <View style={styles.budgetLeft}>
                    <View style={styles.iconBox}>
                      <Ionicons
                        name={getCategoryIcon(cat)}
                        size={20}
                        color="#fff"
                      />
                    </View>
                    <Text style={styles.budgetTitle}>{cat}</Text>
                  </View>
                </View>

                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${percent}%` },
                    ]}
                  />
                </View>

                <View style={styles.budgetFooter}>
                  <Text>Spent: ₹ {spent.toFixed(2)}</Text>
                  <Text>Budget: ₹ {budget.toFixed(2)}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}

      </ScrollView>
    </SafeAreaView>
  );
}