import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import { Button } from "react-native-elements";
import firebase from "./database/firebase";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({
    displayName: firebase.auth().currentUser.displayName,
    email: firebase.auth().currentUser.email,
    uid: firebase.auth().currentUser.uid,
  });

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Avatar.Image
          source={require("./assets/blank-profile.png")}
          size={80}
          margin={20}
        />
        <View margin={20}>
          <Title style={styles.title}>{user.displayName}</Title>
          <Caption>{user.email}</Caption>
        </View>
      </View>
      <Button
        buttonStyle={{
          width: 150,
          backgroundColor: "#C38D86",
          margin: 20,
        }}
        title="Logout"
        onPress={() => signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Montserrat",
  },
});
