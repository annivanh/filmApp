import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import FavouritesScreen from "./FavouritesScreen";
import ReviewScreen from "./ReviewScreen";
import ProfileScreen from "./ProfileScreen";
import WriteReviewScreen from "./WriteReviewScreen";
import Login from "./login/login";
import Signup from "./login/signup";
import Dashboard from "./login/dashboard";
import { Icon, Header } from "react-native-elements";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <View>
        <Header
          centerComponent={{
            text: "FilmApp",
            style: { color: "#fff", fontFamily: "Montserrat", fontSize: 25 },
          }}
          containerStyle={{
            backgroundColor: "#7E4139",
          }}
        />
      </View>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen
          name="Signup"
          component={Signup}
          hidden={true} //these hide the stack name from screen
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          hidden={true} //these hide the stack name from screen
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={User}
          hidden={true} //these hide the stack name from screen
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function User() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "#fff" }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          tabBarIcon: () => (
            <Icon name="home" style="round" size={25} color="#7E4139" />
          ),
        }}
      />
      <Tab.Screen
        name="Reviews"
        component={ReviewScreen}
        options={{
          tabBarIcon: () => <Icon name="edit" size={25} color="#7E4139" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="perm-identity" size={25} color="#7E4139" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        hidden={true} //these hide the stack name from screen
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WriteReview"
        component={WriteReviewScreen}
        hidden={true}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
