// components/login.js

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
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
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

  userLogin = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          this.setState({
            isLoading: false,
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Home");
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
          <Text style={styles.headline}>Log in</Text>
          <View style={styles.loginContainer}>
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
              title="Signin"
              onPress={() => this.userLogin()}
            />

            <Text
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              Don't have account? Click here to signup
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
    flex: 0.45,
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
