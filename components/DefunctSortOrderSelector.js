
import React, {useState} from "react";
import { Modal, StyleSheet, Text, View, Pressable, } from "react-native";

import Registry from "../dataStore/dataSource";
import RadioButton from "./RadioButton";


const SortOrderSelector = ({modalVisible, setModalVisible, option, setOption, displayOrder, setDisplayOrder}) => {
  
  
  const data = [
    { value: "(no order selected)" },
    { value: "Risk Matrix Result" },
  
    { value: "Last Review" },
    { value: "Next Review" },
  ];




    return (
       
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          Alert.alert("Another Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
      <Pressable
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          
        >
          <View
            style={{
              height: 400,
              width: 250,
              padding: 15,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text>Order the list by:</Text>
             
              <RadioButton
                data={data}
                onSelect={(value) => setOption(value)}
                displayOrder={displayOrder}
                setDisplayOrder={setDisplayOrder}
                
              />
              <Text> Your option: {option}</Text>

              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "blue" }}
                >
                  Sumbit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
   
   </Modal>


      );

};



export default SortOrderSelector;

const styles = StyleSheet.create({
  paragraph: {}

});
