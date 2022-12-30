import { browserLocalPersistence } from "firebase/auth";
import React, { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const EditRiskMatrixModal = ({
  editRiskMatrixModalVisible,
  setEditRiskMatrixModalVisible,
  pageBeingEdited,
  setPageBeingEdited,
  permittedLikeValues,
  setPermittedLikeValues,
  permittedImpactValues,
  setPermittedImpactValues,
  likeValue,
  setLikeValue,
  impactValue,
  setImpactValue
}) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const saveToStaging = () => {
    setPageBeingEdited({
      ...pageBeingEdited,
      Likelihood: likeValue,
      Impact: impactValue,
    });
    setEditRiskMatrixModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={editRiskMatrixModalVisible}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setEditRiskMatrixModalVisible(!editRiskMatrixModalVisible);
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
            setEditRiskMatrixModalVisible(!editRiskMatrixModalVisible);
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
      <View style={{ flexDirection: "row" }}>
        <Text></Text>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}></Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "#cdcdcd",
          paddingLeft: 25,
          paddingTop: 30,
        }}
      >
        {/* This is the selection area */}

        <Text style={styles.heading}>Likelihood</Text>

        {permittedLikeValues?.length &&
          permittedLikeValues.map((likelihoodoption) => (
            <Pressable flexDirection="row" alignItems="center" 
              onPress={() => {
                setLikeValue(likelihoodoption);
              }}
              key={likelihoodoption}
            >
             
              {likelihoodoption == likeValue?   <Ionicons name="radio-button-on-outline" size={25} /> : <Ionicons name="radio-button-off-outline" size={25} />}
              <Text style={styles.options}>{likelihoodoption}</Text>
            </Pressable>
          ))}


          <Text style={styles.heading}>Impact</Text>

          {permittedImpactValues?.length &&
          permittedImpactValues.map((impactOption) => (
            <Pressable flexDirection="row" alignItems="center" 
              onPress={() => {
                setImpactValue(impactOption);
              }}
              key={impactOption}
            >
             
              {impactValue == impactOption?   <Ionicons name="radio-button-on-outline" size={25} /> : <Ionicons name="radio-button-off-outline" size={25} />}
              <Text style={styles.options}>{impactOption}</Text>
            </Pressable>
          ))}


      </View>
    </Modal>
  );
};

export default EditRiskMatrixModal;

const styles = StyleSheet.create({
  paragraph: {},
  input: {
    fontSize: 20,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "pink",
  },
  options: {
    fontSize: 20,
    padding: 10,
  },
  heading: {
fontSize: 15,
fontWeight: "bold",

  },

});
