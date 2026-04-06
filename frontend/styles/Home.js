import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  /* HEADER */
  topHeader: {
    backgroundColor: "#6C63FF",
    paddingVertical: 22,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  appTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  /* BALANCE CARD */
  balanceCard: {
    backgroundColor: "#7b6ef6",
    marginHorizontal: 16,
    marginTop: 28,
    borderRadius: 25,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },

  balanceTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 8,
    fontWeight: "bold",
  },

  balanceAmount: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 14,
  },

  balanceBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  incomeBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  expenseBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  incomeText: {
    color: "#bbf7d0",
    fontSize: 18,
    marginLeft: 6,
    fontWeight: "bold",
  },

  incomeAmount: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
  },

  expenseText: {
    color: "#fecaca",
    fontSize: 18,
    marginLeft: 6,
    fontWeight: "bold",
  },

  expenseAmount: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
  },

  /* ACTION BUTTONS */
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 18,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#fff",
    paddingVertical: 22,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  actionText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },

  incomeIcon: {
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 50,
  },

  expenseIcon: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 50,
  },

  /* SECTION HEADER */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 22,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  linkText: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: 13,
  },

  /* TRANSACTION */
  transactionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 16,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  txLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  txIcon: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 25,
    marginRight: 12,
  },

  txTitle: {
    fontWeight: "600",
    fontSize: 14,
  },

  txCategory: {
    fontSize: 12,
    color: "#777",
  },

  txAmount: {
    color: "#22c55e",
    fontWeight: "700",
    fontSize: 14,
  },

  txDate: {
    fontSize: 11,
    color: "#999",
    textAlign: "right",
  },

  /* EMPTY BUDGET */
  emptyBudget: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  emptyText: {
    marginTop: 12,
    fontWeight: "700",
    fontSize: 15,
  },

  emptySub: {
    fontSize: 12,
    color: "#888",
    marginVertical: 6,
    textAlign: "center",
  },

  createBtn: {
    marginTop: 12,
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
  },

  createText: {
    color: "#fff",
    fontWeight: "600",
  },
  createBtn: {
  flexDirection: "row",   // 🔥 REQUIRED
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#6C63FF",
  padding: 12,
  borderRadius: 10,
  marginTop: 10,
},

createText: {
  color: "#fff",
  fontWeight: "bold",
  marginLeft: 6,  // 🔥 spacing between icon & text
},
budgetCard: {
  backgroundColor: "#fff",
  marginHorizontal: 16,
  marginBottom: 14,
  paddingVertical: 9,
  padding: 14,
  borderRadius: 18,
  elevation: 3,
},

budgetHeader: {
  flexDirection: "row",
  alignItems: "center",
},

budgetLeft: {
  flexDirection: "row",
  alignItems: "center",
},

iconBox: {
  width: 50,
  height: 50,
  borderRadius: 14,
  backgroundColor: "#16a34a",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
},

budgetTitle: {
  fontSize: 20,
  fontWeight: "bold",
},

progressBg: {
  height: 14,
  backgroundColor: "#d1fae5",
  borderRadius: 20,
  marginTop: 12,
},

progressFill: {
  height: 14,
  backgroundColor: "#16a34a",
  borderRadius: 20,
},

budgetFooter: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
},
});

export default styles;