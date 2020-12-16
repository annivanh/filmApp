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

export default function Signup({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to sign up!");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: displayName,
          });
          console.log("User registered successfully!");
          setEmail({ email: "" });
          setPassword({ password: "" });
          setDisplayName({ displayName: "" });
        });
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Image} style={styles.image}>
        <Text style={styles.headline}>Sign up</Text>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            value={displayName}
            onChangeText={(displayName) => setDisplayName(displayName)}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            maxLength={15}
          />
          <Button
            color="#7E4139"
            title="Signup"
            onPress={() => registerUser()}
          />

          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Login")}
          >
            Already Registered? Click here to login
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
