import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, Pressable } from "react-native";

import Registry from "../dataStore/dataSource";
import RadioButton from "./RadioButton";

const DividorSelector = ({
  dividorModalVisible,
  setDividorModalVisible,
  currentDividor,
  setCurrentDividor,
  availableDividors,
}) => {


  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={ dividorModalVisible}
      presentationStyle="overFullScreen"
      onRequestClose={() => {
        Alert.alert("Another Modal has been closed.");
        setDividorModalVisible(!dividorModalVisible);
      }}
    >
      <Pressable
        onPress={() => {
          setDividorModalVisible(!dividorModalVisible);
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
             
              padding: 15,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <View style={{  flexDirection: "column" }}>
              <Text>Display this registry, divided by:</Text>

              {availableDividors.map((dividor)=>(
                <Pressable onPress={()=>{
                  setCurrentDividor(dividor);
                  setDividorModalVisible(!dividorModalVisible);
                }}>
                <View  style={styles.dividorView}>
                  <Text style={styles.dividor}>{dividor}</Text>
                </View>
                </Pressable>



              ))}


             
            

        
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default DividorSelector;

const styles = StyleSheet.create({
  
  dividor: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  dividorView: {

  },
  paragraph: {},

});
