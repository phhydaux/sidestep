import React, { useState, useRef } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,

} from "react-native";
import Registry from "../dataStore/dataSource";


const NoteModal = ({ noteModalVisible, setNoteModalVisible, displayedEntry}) => {
  const [text, onChangeText] = useState();

const resetText = () => {
onChangeText();
}

const postComment =() => {

  const Author = "Logged in User";
  const commentDate = new Date();
  const commentStatus = "open";
  const commentText = text;

 Index = Registry.entries.findIndex((entry)=>{return (entry.InternalID == displayedEntry.InternalID)});
console.log(Index);

 Registry.entries[Index].Addendums.Filenote.push({
  Author: {Author},
  Date: {commentDate},
  Status: {commentStatus},
  NoteText: {commentText},

 })
 resetText();
}
  

  return (
    <Modal
      animationType="slide"
      onShow={resetText}
      transparent={false}
      visible={noteModalVisible}
      presentationStyle="formSheet"
      onRequestClose={() => {
        resetText();
        setNoteModalVisible(!noteModalVisible);
      }}
    ><View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      height:50,
      width: "100%",
      alignItems: "center"
    }}>
    <Pressable
                  onPress={() => {
                    resetText();
                    setNoteModalVisible(!noteModalVisible);
                  }}
                >
    <Text style={{
      fontSize: 18,
      padding: 10,
      color: "blue",
    }}>Cancel</Text>
    </Pressable>
    <Text>New Comment</Text>
    <Pressable
                  onPress={() => {
                  
                    postComment();
                  }}
                >
    <Text style={{
      fontSize: 18,
      padding: 10,
    }}>Post</Text>
      </Pressable>
    </View>
    <View style={{flexDirection: "row", }}>
      <Text>Commenting on: </Text><Text style={{ fontWeight: "bold", fontSize: 15}}>{displayedEntry.Title} </Text>
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
                value = {text}
                
                placeholder={"Enter comments"}
                autoFocus ={true} 
                multiline={true}
                textAlignVertical="top"
                keyboardType="default"
                
              />
          
            </View>
          
      
      
    </Modal>
  );
};

export default NoteModal;

const styles = StyleSheet.create({
  paragraph: {},
  input:{
fontSize: 20,
margin: 12,
borderWidth: 0,
padding:10,
  },
});
