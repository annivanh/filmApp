// components/login.js

import React, { useState } from "react";
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
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      setIsLoading({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          setIsLoading({
            isLoading: false,
          });
          setEmail({
            email: "",
          });
          setPassword({
            password: "",
          });
          navigation.replace("Home");
        });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Image} style={styles.image}>
        <Text style={styles.headline}>Log in</Text>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={String(email)}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={String(password)}
            onChangeText={(password) => setPassword(password)}
            maxLength={15}
          />
          <Button color="#7E4139" title="Signin" onPress={() => userLogin()} />

          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Signup")}
          >
            Don't have account? Click here to signup
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
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
