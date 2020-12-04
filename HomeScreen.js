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

export default function HomeScreen({ navigation }) {
  const [film, setFilm] = useState("");
  const [filmInfo, setFilmInfo] = useState([]);
  const [favouriteList, setFavouriteList] = useState([]);

  const findFilm = () => {
    fetch(`https://imdb-api.com/en/API/Search/k_705mewlf/${film}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilmInfo(responseJson.results);
      });
  };
  useEffect(() => {
    firebase
      .database()
      .ref("favourites/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const fave = Object.values(data);
        setFavouriteList(fave);
      });
  }, []);

  const saveFavourite = (item) => {
    firebase
      .database()
      .ref("favourites/")
      .push({ filmTitle: title, description: description });
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
