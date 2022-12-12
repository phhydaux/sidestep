import { ref, push, set } from "firebase/database";
import { database } from "../firebaseConfig";
import React, { useState, useRef } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";

const PageEditScreen = ({
  PageEditScreenVisible,
  setPageEditScreenVisible,
  displayedEntry,
}) => {
  const [text, onChangeText] = useState();
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const resetText = () => {
    onChangeText();
  };

  const postComment = () => {
    const Author = "Logged in User";
    const commentDate = "today";
    const commentStatus = "open";
    const commentText = text;

    const db = database;
    const postListRef = ref(db, "Registries");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      Author: "Kevin",
      Reader: "John",
      DAytime: {
        commentDate: "wednesday",
        problem: "serious",
        fixtime: "never",
      },
      Status: { commentStatus },
      Text: text,
    });

    resetText();
  };

  return (
    <Modal
      animationType="slide"
      onShow={resetText}
      transparent={false}
      visible={PageEditScreenVisible}
      presentationStyle="formSheet"
      onRequestClose={() => {
        resetText();
        setPageEditScreenVisible(!PageEditMenuVisible);
      }}
    >
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
            resetText();
            setPageEditMenuVisible(!PageEditMenuVisible);
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
        <Text>New Entry</Text>
        <Pressable
          onPress={() => {
            postComment();
          }}
        >
          <Text
            style={{
              fontSize: 18,
              padding: 10,
              backgroundColor: "pink",
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>
      {/* End of Header, start of the body of the page  */}
      <View style={{ flexDirection: "row" }}>
        <Text>Commenting on: </Text>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          {displayedEntry.Title}{" "}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "#cdcdcd",
        }}
      >
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"Enter comments"}
          autoFocus={true}
          multiline={true}
          textAlignVertical="top"
          keyboardType="default"
        />
      </View>
    </Modal>
  );
};

export default PageEditScreen;

const styles = StyleSheet.create({
  paragraph: {},
  input: {
    fontSize: 20,
    margin: 12,
    borderWidth: 0,
    padding: 10,
  },
});
