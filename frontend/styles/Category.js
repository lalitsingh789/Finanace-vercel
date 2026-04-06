import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },

  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: "#16a34a",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  total: {
    fontSize: 20,
    fontWeight: "bold",
  },

  count: {
    color: "#777",
  },

  itemCard: {
    backgroundColor: "#fff",
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBoxSmall: {
    width: 35,
    height: 35,
    backgroundColor: "#16a34a",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  itemTitle: {
    fontWeight: "bold",
  },

  itemCategory: {
    fontSize: 12,
    color: "#16a34a",
  },

  amount: {
    color: "#ef4444",
    fontWeight: "bold",
  },

  date: {
    fontSize: 11,
    color: "#888",
  },
});