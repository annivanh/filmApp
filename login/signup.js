// components/signup.js

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import firebase from "../database/firebase";

const Image = {
  uri:
    "https://images.pexels.com/photos/3709371/pexels-photo-3709371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });
          console.log("User registered successfully!");
          this.setState({
            isLoading: false,
            displayName: "",
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Login");
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={Image} style={styles.image}>
          <Text style={styles.headline}>Sign up</Text>
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Name"
              value={this.state.displayName}
              onChangeText={(val) => this.updateInputVal(val, "displayName")}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, "email")}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, "password")}
              maxLength={15}
              secureTextEntry={true}
            />
            <Button
              color="#7E4139"
              title="Signup"
              onPress={() => this.registerUser()}
            />

            <Text
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              Already Registered? Click here to login
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  headline: {
    marginTop: 150,
    fontSize: 25,
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  loginContainer: {
    flex: 0.6,
    marginTop: 100,
    margin: 20,
    backgroundColor: "#ffffff",
    height: "50%",
    width: "90%",
    borderRadius: 5,
  },
  inputStyle: {
    width: "90%",
    marginTop: 15,
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#7E4139",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
