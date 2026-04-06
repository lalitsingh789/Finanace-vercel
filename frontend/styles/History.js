import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },

  header: {
    backgroundColor: "#6C63FF",
    paddingVertical: 20,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 15,
    padding: 5,
  },

  tabBtn: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: "#6C63FF",
  },

  tabText: {
    color: "#555",
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },

  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
  },

  dateText: {
    marginLeft: 6,
  },

  toText: {
    fontSize: 13,
  },

  quickRow: {
    paddingLeft: 12,
    paddingVertical: 10,
    maxHeight: 50,
  },

  quickBtn: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  quickActive: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  quickText: {
    color: "#6C63FF",
  },

  quickActiveText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
  },

  title: {
    fontWeight: "600",
  },

  tag: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 3,
  },

  tagText: {
    fontSize: 12,
    color: "#16a34a",
  },

  right: {
    alignItems: "flex-end",
  },

  amount: {
    fontWeight: "700",
  },

  date: {
    fontSize: 12,
    color: "#666",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },

  emptyText: {
    marginTop: 10,
    color: "#777",
  },
});