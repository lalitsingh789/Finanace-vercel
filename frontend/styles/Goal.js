import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, padding: 16 },

  header: { fontSize: 20, fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },

  title: { fontSize: 16 },
  amount: { fontSize: 24, fontWeight: "bold" },

  progressBg: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginVertical: 10,
  },

  progressFill: {
    height: 10,
    backgroundColor: "#6C63FF",
  },
});

