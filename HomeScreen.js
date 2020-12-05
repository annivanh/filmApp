import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Input, Button, ListItem, Icon } from "react-native-elements";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
/*
try {
  firebase.initializeApp({
    apiKey: "AIzaSyBVJemfjD5-wOxFiT9TfeXHqFBAAnYUZM0",
    authDomain: "filmapp-bb7d3.firebaseapp.com",
    databaseURL: "https://filmapp-bb7d3.firebaseio.com",
    projectId: "filmapp-bb7d3",
    storageBucket: "filmapp-bb7d3.appspot.com",
    messagingSenderId: "643933918059",
    appId: "1:643933918059:web:2c716c24ed6c0ad039722e",
  });
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error raised", err.stack);
  }
}
const firebaseApp = firebase;
*/
//firebase.initializeApp(firebaseConfig);

export default function HomeScreen({ navigation }) {
  const [film, setFilm] = useState("");
  const [filmInfo, setFilmInfo] = useState([]);

  const findFilm = () => {
    fetch(`https://imdb-api.com/en/API/Search/k_705mewlf/${film}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilmInfo(responseJson.results);
      });
  };

  const [loaded] = useFonts({
    MontserratLight: require("./assets/fonts/MontserratAlternates-ExtraLight.ttf"),
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#C38D86",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headline}>Welcome to FilmApp!</Text>
        <Text style={styles.text}>Start by searching a film</Text>
      </View>
      <View style={{ flexDirection: "row", width: "80%", paddingRight: 20 }}>
        <Input
          placeholder="Write down the name"
          onChangeText={(film) => setFilm(film)}
          style={{ width: 100 }}
        />
        <Button
          title="Search"
          onPress={findFilm}
          buttonStyle={{ backgroundColor: "#C38D86" }}
        />
      </View>
      <FlatList
        ItemSeparatorComponent={listSeparator}
        keyExtractor={(item) => item.id}
        data={filmInfo}
        renderItem={({ item }) => (
          <ListItem>
            <Image
              style={{ width: 150, height: 150 }}
              source={{ uri: item.image }}
            />
            <ListItem.Content>
              <ListItem.Title style={{ marginBottom: 20 }}>
                {item.title}, {item.description}
              </ListItem.Title>
              <ListItem.Subtitle>
                <Button
                  title="Review"
                  buttonStyle={{ width: 150, backgroundColor: "#C38D86" }}
                  onPress={() =>
                    navigation.navigate("WriteReview", {
                      filmTitle: item.title,
                    })
                  }
                />
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </View>
  );
}

const BottomNavi = () => {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  headline: {
    fontSize: 30,
    margin: 10,
    fontFamily: "Montserrat",
  },
  text: {
    fontSize: 15,
    margin: 10,
  },
});
