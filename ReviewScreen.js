import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { Button, ListItem, Icon } from "react-native-elements";
import firebase from "firebase";

export default function ReviewScreen({ navigation }) {
  const [fullReview, setFullReview] = useState([]);

  useEffect(() => {
    readUserData();
    console.log("hello");
  }, []);

  const readUserData = () => {
    firebase
      .database()
      .ref("reviews/")
      .on("value", function (snapshot) {
        console.log(snapshot.val());
        setFullReview(snapshot.val());
      });
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Reviews</Text>
      <FlatList
        ItemSeparatorComponent={listSeparator}
        data={Object.keys(fullReview)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>{fullReview[item].headline}</ListItem.Title>
              <ListItem.Subtitle>
                <View>
                  <Text>Film: {fullReview[item].filmTitle}</Text>
                  <Text>Rating: {fullReview[item].rating}/5</Text>
                  <Text>{fullReview[item].reviewText}</Text>
                </View>
              </ListItem.Subtitle>
              <Icon />
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
  headline: {
    fontSize: 40,
    margin: 10,
    fontFamily: "Montserrat",
    alignItems: "center",
    justifyContent: "center",
  },
});
