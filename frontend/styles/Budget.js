import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    padding: 15,
    
  },

  /* TITLE */
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111",
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  /* HEADER ROW */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* ICON BOX */
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  /* TEXT */
  category: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  amount: {
    fontSize: 14,
    color: "#666",
  },

  /* PROGRESS BAR */
  progressBg: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    marginTop: 12,
    overflow: "hidden",
  },

  progressFill: {
    height: 8,
    borderRadius: 10,
  },

  /* BUTTONS */
  addBtn: {
    marginTop: 12,
    backgroundColor: "#6C63FF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  updateBtn: {
    backgroundColor: "#6C63FF",
    paddingVertical: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 14,
  },

  /* MODAL */
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111",
  },

  input: {
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});