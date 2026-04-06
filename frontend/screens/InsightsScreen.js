import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FinanceContext } from "../context/FinanceContext";
import styles from "../styles/Insights";

const screenWidth = Dimensions.get("window").width;

export default function InsightsScreen() {
  const { transactions } = useContext(FinanceContext);

  const [activeTab, setActiveTab] = useState("stats");
  const [startDate, setStartDate] = useState(new Date(2026, 3, 1));
  const [endDate, setEndDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [stats, setStats] = useState(null);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // 🔥 PROCESS DATA
  const processData = (data) => {
    let totalIncome = 0;
    let totalSpend = 0;

    let dailyExpenseMap = {};
    let categoryMap = {};

    data.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString("en-IN");

      if (item.type === "income") {
        totalIncome += item.amount;
      } else {
        totalSpend += item.amount;

        if (!dailyExpenseMap[date]) dailyExpenseMap[date] = 0;
        dailyExpenseMap[date] += item.amount;

        if (!categoryMap[item.category]) {
          categoryMap[item.category] = 0;
        }
        categoryMap[item.category] += item.amount;
      }
    });

    const labels = Object.keys(dailyExpenseMap);
    const values = Object.values(dailyExpenseMap);

    setBarData({
      labels: labels.length ? labels : ["No Data"],
      datasets: [{ data: values.length ? values : [0] }],
    });

    const pie = Object.keys(categoryMap).map((key, index) => ({
      name: key,
      amount: categoryMap[key],
      color: ["#6C63FF", "#22c55e", "#f59e0b", "#ef4444"][index % 4],
      legendFontColor: "#333",
      legendFontSize: 12,
    }));

    setPieData(pie);

    const avgDaily =
      values.length > 0
        ? Math.round(totalSpend / values.length)
        : 0;

    const peak = Math.max(...values, 0);
    const lowest = values.length ? Math.min(...values) : 0;

    setStats({
      totalIncome,
      totalSpend,
      avgDaily,
      avgMonthly: totalSpend,
      avgYearly: totalSpend,
      peak,
      lowest,
    });
  };

  // 🔥 REAL-TIME UPDATE
  useEffect(() => {
    if (!transactions) return;

    const filtered = transactions.filter((item) => {
      const d = new Date(item.date);

      const itemDate = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
      );

      const start = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );

      const end = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      );

      return itemDate >= start && itemDate <= end;
    });

    processData(filtered);
  }, [transactions, startDate, endDate]);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: () => "#6C63FF",
    labelColor: () => "#333",
    fillShadowGradient: "#6C63FF",
    fillShadowGradientOpacity: 1,
  };

  if (!barData || !stats) {
    return (
      <Text style={{ marginTop: 50, textAlign: "center" }}>
        Loading...
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.topHeader}>
          <Text style={styles.headerTitle}>Analytics</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "stats" && styles.activeTab]}
            onPress={() => setActiveTab("stats")}
          >
            <Text style={activeTab === "stats" ? styles.activeTabText : styles.tabText}>
              Spend Statistics
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "breakdown" && styles.activeTab]}
            onPress={() => setActiveTab("breakdown")}
          >
            <Text style={activeTab === "breakdown" ? styles.activeTabText : styles.tabText}>
              Spend Breakdown
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date */}
        <View style={styles.dateRow}>
          <TouchableOpacity style={styles.dateBox} onPress={() => setShowStartPicker(true)}>
            <Ionicons name="calendar-outline" size={18} />
            <Text style={styles.dateText}> {formatDate(startDate)}</Text>
          </TouchableOpacity>

          <Text> to </Text>

          <TouchableOpacity style={styles.dateBox} onPress={() => setShowEndPicker(true)}>
            <Ionicons name="calendar-outline" size={18} />
            <Text style={styles.dateText}> {formatDate(endDate)}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.graphTitle}>
          {activeTab === "stats" ? "Spend Graph" : "Spend Breakdown"}
        </Text>

        <View style={styles.chartContainer}>
          {activeTab === "stats" ? (
            <BarChart
              data={barData}
              width={screenWidth - 30}
              height={220}
              chartConfig={chartConfig}
              fromZero
              showValuesOnTopOfBars
            />
          ) : (
            <PieChart
              data={pieData}
              width={screenWidth - 30}
              height={220}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              absolute
            />
          )}
        </View>

        {/* Stats */}
        {activeTab === "stats" && (
          <View style={styles.statsContainer}>
            <Text style={styles.stat}>Total income: INR {stats.totalIncome}</Text>
            <Text style={styles.stat}>Total spend: INR {stats.totalSpend}</Text>
            <Text style={styles.stat}>Average daily spend: INR {stats.avgDaily}</Text>
            <Text style={styles.stat}>Average monthly spend: INR {stats.avgMonthly}</Text>
            <Text style={styles.stat}>Average yearly spend: INR {stats.avgYearly}</Text>
            <Text style={styles.stat}>Peak spend: INR {stats.peak}</Text>
            <Text style={styles.stat}>Lowest spend: INR {stats.lowest}</Text>
          </View>
        )}

        {/* Breakdown List */}
        {activeTab === "breakdown" &&
          pieData.map((item, index) => (
            <View key={index} style={[styles.categoryCard, { borderColor: item.color }]}>
              <View style={styles.categoryLeft}>
                <Ionicons name="wallet-outline" size={20} color={item.color} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </View>
              <Text style={styles.categoryAmount}>₹{item.amount}</Text>
            </View>
          ))}

        {/* Date Pickers */}
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            onChange={(e, d) => {
              setShowStartPicker(false);
              if (d) setStartDate(d);
            }}
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            onChange={(e, d) => {
              setShowEndPicker(false);
              if (d) setEndDate(d);
            }}
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
}