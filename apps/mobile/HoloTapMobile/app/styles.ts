import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, padding: 20 },
  section: { gap: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
