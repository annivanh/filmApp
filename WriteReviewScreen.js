import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
import firebase from "firebase";

export default function WriteReviewScreen({ route, navigation }) {
  const [headline, setHeadline] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [fullReview, setFullReview] = useState([]);
  const { filmTitle } = route.params;

  useEffect(() => {
    firebase
      .database()
      .ref("reviews/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const reviewInfo = Object.values(data);
        setFullReview(reviewInfo);
      });
  }, []);

  const saveReview = () => {
    firebase.database().ref("reviews/").push({
      headline: headline,
      rating: rating,
      filmTitle: filmTitle,
      reviewText: reviewText,
    });
    setHeadline("");
    setRating("");
    setReviewText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text}>Film: {filmTitle}</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#C38D86",
            width: "80%",
            height: 30,
            marginBottom: 10,
          }}
          placeholder="Write the headline of your review here"
          onChangeText={(headline) => setHeadline(headline)}
          value={headline}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#C38D86",
            width: "80%",
            height: 30,
            marginBottom: 10,
          }}
          placeholder="Rating 1-5"
          keyboardType="numeric"
          onChangeText={(rating) => setRating(rating)}
          value={rating}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#C38D86",
            width: "80%",
            height: 200,
            marginBottom: 10,
          }}
          multiline={true}
          placeholder="Write review here"
          onChangeText={(reviewText) => setReviewText(reviewText)}
          value={reviewText}
        />
        <Button
          buttonStyle={{ width: 150, backgroundColor: "#C38D86" }}
          title="Save review"
          onPress={saveReview}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
