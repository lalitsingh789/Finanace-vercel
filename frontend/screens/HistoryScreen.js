import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"; // ✅ IMPORTANT
import styles from "../styles/History";

export default function HistoryScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("All");
  const [activeFilter, setActiveFilter] = useState("Month Till Date");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    "Month Till Date",
    "Last Month",
    "This Year",
    "Last 7 Days",
    "Last 30 Days",
    "All",
  ];

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.1.19:5000/api/transactions");
      const json = await res.json();
      setData(json.reverse()); // latest first
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // ✅ AUTO REFRESH WHEN SCREEN FOCUSED
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // 🔥 FILTER LOGIC
  const filteredData = data.filter((item) => {
    if (activeTab === "Incomes") return item.type === "income";
    if (activeTab === "Expenses") return item.type === "expense";
    return true;
  });

  // 🔥 EMPTY STATE
  if (!loading && filteredData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transaction History</Text>
        </View>

        <View style={styles.emptyContainer}>
          <Ionicons name="wallet-outline" size={60} color="#aaa" />
          <Text style={styles.emptyText}>No Transactions Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 🔥 CARD UI
  const renderItem = ({ item }) => {
    const isIncome = item.type === "income";

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate("TransactionDetail", {
            transaction: item, // ✅ NO refresh passed
          })
        }
      >
        <View style={styles.card}>
          {/* LEFT */}
          <View style={styles.left}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isIncome ? "#16a34a" : "#ef4444" },
              ]}
            >
              <Ionicons
                name={isIncome ? "wallet" : "card"}
                size={20}
                color="#fff"
              />
            </View>

            <View>
              <Text style={styles.title}>
                {item.note || item.category}
              </Text>

              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.category}</Text>
              </View>
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.right}>
            <Text
              style={[
                styles.amount,
                { color: isIncome ? "#16a34a" : "#ef4444" },
              ]}
            >
              {isIncome ? "+ " : "- "}₹ {item.amount}
            </Text>

            <Text style={styles.date}>
              {new Date(item.date).toLocaleString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 🔥 TOP SECTION */}
      <View>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transaction History</Text>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          {["All", "Incomes", "Expenses"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabBtn,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DATE RANGE */}
        <View style={styles.dateRow}>
          <View style={styles.dateBox}>
            <Ionicons name="calendar-outline" size={18} />
            <Text style={styles.dateText}>Apr 1, 2026</Text>
          </View>

          <Text style={styles.toText}>to</Text>

          <View style={styles.dateBox}>
            <Ionicons name="calendar-outline" size={18} />
            <Text style={styles.dateText}>Apr 5, 2026</Text>
          </View>
        </View>

        {/* FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickRow}
        >
          {filters.map((item) => {
            const isActive = activeFilter === item;

            return (
              <TouchableOpacity
                key={item}
                style={isActive ? styles.quickActive : styles.quickBtn}
                onPress={() => setActiveFilter(item)}
              >
                <Text
                  style={
                    isActive
                      ? styles.quickActiveText
                      : styles.quickText
                  }
                >
                  {isActive ? "✓ " : ""}
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

      </View>

      {/* 🔥 LIST */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 10 }} />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingTop: 10,
            paddingBottom: 20,
          }}
        />
      )}
    </SafeAreaView>
  );
}