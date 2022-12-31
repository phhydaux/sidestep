
import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  
} from "react-native";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const EditTextBlockScreen = ({ navigation, route }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const [count, setCount] = useState();
  const elementToEdit = route.params.elementToEdit;
  const [textBlock, setTextBlock] = useState(
    userProfile.pageBeingEdited[elementToEdit]
  );

  const saveToStaging = () => {
    const copyOfPage = JSON.parse(JSON.stringify(userProfile.pageBeingEdited));
    copyOfPage[elementToEdit] = textBlock;

    setUserProfile({
      ...userProfile,
      pageBeingEdited: { ...copyOfPage },
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 50,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text
            style={{
              fontSize: 18,
              padding: 10,
              color: "blue",
            }}
          >
            Cancel
          </Text>
        </Pressable>
        <View alignItems="center">
          <Text style={{ fontSize: 18 }}>Editing page element:</Text>
          <Text> {userProfile.currentPageElement}</Text>
        </View>
        <Pressable
          onPress={() => {
            saveToStaging();
          }}
        >
          <Text style={{ fontSize: 18, color: "blue", paddingRight: 5 }}>
            Preview
          </Text>
        </Pressable>
      </View>

      <View>
        <TextInput
          style={styles.input}
          onChangeText={setTextBlock}
          value={textBlock}
          autoFocus={true}
          multiline={true}
          textAlignVertical="top"
          keyboardType="default"
        />
      </View>
    </SafeAreaView>
  );
};

export default EditTextBlockScreen;

const styles = StyleSheet.create({
  paragraph: {},
  input: {
    fontSize: 20,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "pink",
  },
});
