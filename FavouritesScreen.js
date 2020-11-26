import React from "react";
import { StyleSheet, Text, SafeAreaView, View, FlatList } from "react-native";

export default function FavouritesScreen({ route, navigation }) {
  const {} = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Favourites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
