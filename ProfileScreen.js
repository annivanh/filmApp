import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import { Button } from "react-native-elements";
import firebase from "./database/firebase";

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      uid: "",
    };
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    };
    return (
      <View style={styles.container}>
        <Profile />
        <Button
          buttonStyle={{ width: 150, backgroundColor: "#C38D86" }}
          title="Logout"
          onPress={() => this.signOut()}
        />
      </View>
    );
  }
}

const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={require("./assets/blank-profile.png")}
            size={80}
            margin={20}
          />
          <View margin={20}>
            <Title>Anni</Title>
            <Caption>av@email.com</Caption>
          </View>
        </View>
        <Text>Edit Profile</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});
