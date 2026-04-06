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


export default function ExpenseScreen({ navigation, route }) {

  const {
    addTransactionLocal,
    updateTransactionLocal,
  } = useContext(FinanceContext);

  const transaction = route?.params?.transaction;

  // ✅ PREFILL FIX
  const [selected, setSelected] = useState(transaction?.category || "Food");
  const [amount, setAmount] = useState(
    transaction ? String(transaction.amount) : ""
  );
  const [note, setNote] = useState(transaction?.note || "");
  const [date, setDate] = useState(
    transaction ? new Date(transaction.date) : new Date()
  );

  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    { name: "Food", icon: "restaurant-outline", color: "#22c55e" },
    { name: "Transport", icon: "car-outline", color: "#3b82f6" },
    { name: "Bills", icon: "receipt-outline", color: "#6366f1" },
    { name: "Shopping", icon: "cart-outline", color: "#f59e0b" },
    { name: "Health", icon: "medkit-outline", color: "#10b981" },
    { name: "Entertainment", icon: "game-controller-outline", color: "#ec4899" },
  ];

  const onChangeDate = (e, d) => {
    setShowPicker(false);
    if (d) setDate(d);
  };

  // ✅ FIXED SAVE FUNCTION
  const handleSave = async () => {
    if (!amount || isNaN(amount)) {
      return alert("Enter valid amount");
    }

    setLoading(true);

    try {
      const url = transaction
        ? `http://192.168.1.19:5000/api/transactions/${transaction._id}`
        : "http://192.168.1.19:5000/api/transactions";

      const method = transaction ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "expense",
          amount: Number(amount),
          category: selected,
          note,
          date: date.toISOString(), // ✅ FIXED
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save transaction");
      }

      const savedData = await res.json();

      // ✅ CONTEXT UPDATE
      if (transaction) {
        updateTransactionLocal(savedData);
      } else {
        addTransactionLocal(savedData);
      }

      alert(transaction ? "Updated ✅" : "Saved ✅");

      navigation.goBack();

    } catch (err) {
      console.log(err);
      alert("Error saving expense ❌");
    } finally {
      setLoading(false); // ✅ SAFE
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>
            {transaction ? "Edit Expense" : "Add Expense"}
          </Text>
          <Ionicons name="card-outline" size={22} />
        </View>

        {/* AMOUNT */}
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

        {/* DESCRIPTION */}
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

        {/* CATEGORY */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.chipContainer}>
          {categories.map((item) => {
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

        {/* DATE */}
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.dateRow}
          onPress={() => setShowPicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} />
          <Text style={styles.dateText}>
            {date.toLocaleString()}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={onChangeDate}
          />
        )}

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="save-outline" size={20} color="#fff" />
              <Text style={styles.saveText}>
                {transaction ? "Update Expense" : "Save Expense"}
              </Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}