import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/Category";

export default function CategoryDetailScreen({ route, navigation }) {
  const { category } = route.params;

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch("http://192.168.1.19:5000/api/transactions");
    const data = await res.json();

    const filtered = data.filter(
      (t) => t.category === category && t.type === "expense"
    );

    setTransactions(filtered);
  };

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.title}>{category} Expenses</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* SUMMARY */}
      <Text style={styles.heading}>All {category} Expenses</Text>

      <View style={styles.summaryCard}>
        <View style={styles.iconBox}>
          <Ionicons name="restaurant" size={20} color="#fff" />
        </View>

        <View>
          <Text style={styles.total}>₹ {total.toFixed(2)}</Text>
          <Text style={styles.count}>
            {transactions.length} transactions
          </Text>
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBoxSmall}>
                <Ionicons name="restaurant" size={16} color="#fff" />
              </View>

              <View>
                <Text style={styles.itemTitle}>
                  {item.note || "Transaction"}
                </Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.amount}>
                - ₹ {item.amount}
              </Text>
              <Text style={styles.date}>
                {new Date(item.date).toDateString()}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}