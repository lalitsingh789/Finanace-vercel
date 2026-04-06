import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/Transcation";
import { FinanceContext } from "../context/FinanceContext";

export default function TransactionDetailScreen({ route, navigation }) {

  const { fetchTransactions } = useContext(FinanceContext);

  const [transaction, setTransaction] = useState(route.params.transaction);

  const isIncome = transaction.type === "income";

  // 🔥 FETCH LATEST DATA
  const fetchTransaction = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.19:5000/api/transactions/${transaction._id}`
      );
      const data = await res.json();
      setTransaction(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // 🔥 AUTO REFRESH WHEN SCREEN FOCUS
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchTransaction);
    return unsubscribe;
  }, [navigation]);

  // 🔥 DELETE FUNCTION (REAL-TIME UPDATE)
  const handleDelete = async () => {
    try {
      await fetch(
        `http://192.168.1.19:5000/api/transactions/${transaction._id}`,
        { method: "DELETE" }
      );

      // 🔥 UPDATE GLOBAL STATE (INSIGHTS WILL UPDATE)
      await fetchTransactions();

      alert("Deleted ✅");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Error ❌");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.headerTitle}>Transaction Details</Text>

        <View style={{ flexDirection: "row" }}>
          {/* EDIT */}
          <Ionicons
            name="create-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 12 }}
            onPress={() =>
              navigation.navigate(
                transaction.type === "income" ? "Income" : "Expense",
                { transaction }
              )
            }
          />

          {/* DELETE */}
          <MaterialIcons
            name="delete"
            size={22}
            color="#EF4444"
            onPress={handleDelete}
          />
        </View>
      </View>

      {/* TOP CARD */}
      <View style={styles.topCard}>
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: isIncome ? "#dcfce7" : "#fee2e2",
            },
          ]}
        >
          <Ionicons
            name={isIncome ? "wallet" : "restaurant"}
            size={36}
            color={isIncome ? "#16a34a" : "#ef4444"}
          />
        </View>

        <Text style={styles.title}>
          {transaction.note || transaction.category}
        </Text>

        <Text style={styles.category}>
          {transaction.category}
        </Text>

        <Text
          style={[
            styles.amount,
            {
              color: isIncome ? "#16a34a" : "#ef4444",
            },
          ]}
        >
          {isIncome ? "+ " : "- "}INR {transaction.amount}
        </Text>
      </View>

      {/* DETAILS */}
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>
          Transaction Details
        </Text>

        {/* TYPE */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="swap-horizontal" size={20} color="#6C63FF" />
            </View>
            <View>
              <Text style={styles.label}>Type</Text>
              <Text style={styles.value}>
                {isIncome ? "Income" : "Expense"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* CATEGORY */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="folder" size={20} color="#6C63FF" />
            </View>
            <View>
              <Text style={styles.label}>Category</Text>
              <Text style={styles.value}>
                {transaction.category}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* DATE */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="calendar" size={20} color="#6C63FF" />
            </View>
            <View>
              <Text style={styles.label}>Date & Time</Text>
              <Text style={styles.value}>
                {new Date(transaction.date).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

      </View>

    </SafeAreaView>
  );
}