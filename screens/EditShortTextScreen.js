import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const EditShortTextScreen = ({ navigation, route }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
  

  const [count, setCount] = useState();
  const elementToEdit = route.params.elementToEdit;
  const [shortText, setShortText] = useState(
    userProfile.pageBeingEdited[elementToEdit]
  );

  const saveToStaging = () => {

    const copyOfPage = JSON.parse(JSON.stringify(userProfile.pageBeingEdited))
    copyOfPage[elementToEdit] = shortText;

    
    setUserProfile({
      ...userProfile,
      pageBeingEdited: {...copyOfPage}
    });

    navigation.goBack();
  };

  const onChangeText = (text) => {
    setShortText(text);
    setCount(125 - text.length);
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
          <Text>{elementToEdit}</Text>
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
        <Text>This is a limited length text field.</Text>
        <Text> There are {count} characters left</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={shortText}
          autoFocus={true}
          multiline={true}
          maxLength={125}
          textAlignVertical="top"
          keyboardType="default"
        />
      </View>
    </SafeAreaView>
  );
};

export default EditShortTextScreen;

const styles = StyleSheet.create({
  paragraph: {},
  input: {
    fontSize: 20,
    margin: 20,
    borderWidth: 0,
    padding: 0,
    backgroundColor: "pink",
    paddingLeft: 50,
    paddingBottom: 5,
    
  },
});
