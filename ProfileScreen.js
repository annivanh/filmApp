import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import { Button } from "react-native-elements";

const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={require("./assets/blank-profile.png")}
            size={80}
            margin={20}
          />
          <View margin={20}>
            <Title>Anni</Title>
            <Caption>av@email.com</Caption>
          </View>
        </View>
        <Text>Edit Profile</Text>
        <Button
          buttonStyle={{ width: 150, backgroundColor: "#C38D86" }}
          title="Log out"
        />
      </View>
    </SafeAreaView>
  );
};
export default function ProfileScreen({ navigation }) {
  return (
    <View>
      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
