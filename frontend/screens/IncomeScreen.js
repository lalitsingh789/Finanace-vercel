import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles/Income";
import { FinanceContext } from "../context/FinanceContext";

export default function IncomeScreen({ navigation, route }) {
  const transaction = route?.params?.transaction;

  const { addTransactionLocal, updateTransactionLocal } =
    useContext(FinanceContext);

  const [selected, setSelected] = useState(
    transaction?.category || "Salary"
  );
  const [amount, setAmount] = useState(
    transaction ? String(transaction.amount) : ""
  );
  const [note, setNote] = useState(transaction?.note || "");
  const [date, setDate] = useState(
    transaction ? new Date(transaction.date) : new Date()
  );

  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const sources = [
    { name: "Salary", icon: "wallet-outline", color: "#22c55e" },
    { name: "Freelance", icon: "laptop-outline", color: "#3b82f6" },
    { name: "Gift", icon: "gift-outline", color: "#f59e0b" },
    { name: "Bonus", icon: "cash-outline", color: "#6366f1" },
    { name: "Investment", icon: "trending-up-outline", color: "#8b5cf6" },
    { name: "Other", icon: "apps-outline", color: "#6b7280" },
  ];

  const onChangeDate = (_, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSave = async () => {
    if (!amount || isNaN(amount)) {
      return alert("Enter valid amount");
    }

    setLoading(true);

    try {
      const url = transaction
        ? `https://finanace-vercel.vercel.app//api/transactions/${transaction._id}`
        : "https://finanace-vercel.vercel.app//api/transactions";

      const method = transaction ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "income",
          amount: Number(amount),
          category: selected,
          note,
          date: date.toISOString(), // ✅ FIX
        }),
      });

      if (!res.ok) throw new Error("Failed");

      const savedData = await res.json();

      if (transaction) {
        updateTransactionLocal(savedData);
      } else {
        addTransactionLocal(savedData);
      }

      alert(transaction ? "Updated ✅" : "Saved ✅");

      navigation.goBack(); // ✅ ONLY THIS (no refresh param)

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>
            {transaction ? "Edit Income" : "Add Income"}
          </Text>
          <Ionicons name="wallet-outline" size={22} />
        </View>

        <Text style={styles.label}>Amount</Text>
        <View style={styles.amountRow}>
          <Text style={styles.currency}>₹</Text>
          <TextInput
            placeholder="0.00"
            style={styles.amountInput}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <Text style={styles.label}>Description</Text>
        <View style={styles.inputRow}>
          <Ionicons name="document-text-outline" size={20} />
          <TextInput
            placeholder="Description"
            style={styles.textInput}
            value={note}
            onChangeText={setNote}
          />
        </View>

        <Text style={styles.label}>Source</Text>
        <View style={styles.chipContainer}>
          {sources.map((item) => {
            const isSelected = selected === item.name;

            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.chip,
                  {
                    borderColor: item.color,
                    backgroundColor: isSelected ? item.color : "#fff",
                  },
                ]}
                onPress={() => setSelected(item.name)}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={isSelected ? "#fff" : item.color}
                />
                <Text style={{ color: isSelected ? "#fff" : "#333" }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Date & Time</Text>
        <TouchableOpacity style={styles.dateRow} onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar-outline" size={20} />
          <Text style={styles.dateText}>{date.toLocaleString()}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={onChangeDate}
          />
        )}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          {loading ? <ActivityIndicator color="#fff" /> : (
            <>
              <Ionicons name="save-outline" size={20} color="#fff" />
              <Text style={styles.saveText}>
                {transaction ? "Update Income" : "Save Income"}
              </Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}