import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#6C63FF",
    
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  /* TOP CARD */
  topCard: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    elevation: 2,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  category: {
    fontSize: 16,
    color: "#16a34a",
    marginTop: 5,
  },

  amount: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 15,
  },

  /* DETAILS */
  detailsCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 18,
    padding: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  label: {
    fontSize: 13,
    color: "#6b7280",
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 14,
  },
});