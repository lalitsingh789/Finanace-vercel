import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    padding: 16,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  /* LABEL */
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
    color: "#4b4b6a",
  },

  /* AMOUNT */
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
  },

  currency: {
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 8,
  },

  amountInput: {
    flex: 1,
    fontSize: 22,
    paddingVertical: 15,
  },

  /* INPUT */
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
  },

  textInput: {
    marginLeft: 10,
    flex: 1,
  },

  /* CHIP GRID */
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  chip: {
    width: "30%",              // 3 per row
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
    backgroundColor: "#fff",
  },

  chipText: {
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
    fontWeight: "500",
  },

  /* DATE */
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    justifyContent: "space-between",
  },

  dateText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
  },

  rightRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  resetText: {
    marginHorizontal: 5,
    color: "#555",
    fontSize: 12,
  },

  /* SAVE BUTTON */
  saveBtn: {
    flexDirection: "row",
    backgroundColor: "#14a38b", // income default
    padding: 16,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 10,
    fontSize: 15,
  },
});

export default styles;