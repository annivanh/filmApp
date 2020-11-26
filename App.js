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
import { Icon, Header } from "react-native-elements";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBVJemfjD5-wOxFiT9TfeXHqFBAAnYUZM0",
  authDomain: "filmapp-bb7d3.firebaseapp.com",
  databaseURL: "https://filmapp-bb7d3.firebaseio.com",
  projectId: "filmapp-bb7d3",
  storageBucket: "filmapp-bb7d3.appspot.com",
  messagingSenderId: "643933918059",
  appId: "1:643933918059:web:2c716c24ed6c0ad039722e",
};

firebase.initializeApp(firebaseConfig);

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
        />
      </View>
      <Tab.Navigator style={{ height: 500 }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: () => (
              <Icon name="home" style="round" size={25} color="#CDCCCE" />
            ),
          }}
        />
        <Tab.Screen
          name="Reviews"
          component={ReviewScreen}
          options={{
            tabBarIcon: () => <Icon name="edit" size={25} color="#CDCCCE" />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="perm-identity" size={25} color="#CDCCCE" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        hidden={true} //nämä piilottavat stackin nimen ruudulta
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
