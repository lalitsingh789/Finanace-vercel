import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },

  topHeader: {
    backgroundColor: "#6C63FF",
    paddingVertical: 25,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#e9e9ee",
    margin: 12,
    borderRadius: 25,
    padding: 4,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: "#6C63FF",
  },

  tabText: {
    color: "#666",
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
    elevation: 2,
  },

  dateText: {
    marginLeft: 6,
    color: "#333",
  },

  graphTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 12,
    marginTop: 10,
  },

  chartContainer: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 15,
    padding: 10,
    elevation: 3,
  },

  statsContainer: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  stat: {
    marginBottom: 6,
    color: "#333",
  },

  categoryCard: {
    borderWidth: 1.5,
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  categoryText: {
    marginLeft: 10,
    fontWeight: "600",
  },

  categoryAmount: {
    fontWeight: "600",
  },
});