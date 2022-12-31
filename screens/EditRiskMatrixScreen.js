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
import { SafeAreaView } from "react-native-safe-area-context";
import RiskLevelDisplay from "../components/RiskLevelDisplay";

const EditRiskMatrixScreen = ({ navigation, route }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const elementToEdit = route.params.elementToEdit;
  const [impactValue, setImpactValue] = useState(
    userProfile.pageBeingEdited["Impact"]
  );
  const [likeValue, setLikeValue] = useState(
    userProfile.pageBeingEdited["Likelihood"]
  );
  const permittedLikeValues = Object.keys(
    userProfile.currentRegistryData["Meta"]["PageElements"]["Likelihood"][
      "PermittedValues"
    ]
  );
  const permittedImpactValues = Object.keys(
    userProfile.currentRegistryData["Meta"]["PageElements"]["Impact"][
      "PermittedValues"
    ]
  );

  const saveToStaging = () => {
    const copyOfPage = JSON.parse(JSON.stringify(userProfile.pageBeingEdited));
    copyOfPage["Likelihood"] = likeValue;
    copyOfPage["impactValue"] = impactValue;

    setUserProfile({
      ...userProfile,
      pageBeingEdited: { ...copyOfPage },
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
     

      <View
        style={{
          flex: 0,
          flexDirection: "column",
         justifyContent: "center",
          
          backgroundColor: "#bdcdcd",
          paddingLeft: 25,
          paddingTop: 30,
        }}
      >
      <RiskLevelDisplay
      likelihood={likeValue}
      impact={impactValue} />
      <Text></Text>
      
        {/* This is the selection area */}

        <Text style={styles.heading}>Likelihood</Text>

        {permittedLikeValues?.length &&
          permittedLikeValues.map((likelihoodoption) => (
            <Pressable
              flexDirection="row"
              alignItems="center"
              onPress={() => {
                setLikeValue(likelihoodoption);
              }}
              key={likelihoodoption}
            >
              {likelihoodoption == likeValue ? (
                <Ionicons name="radio-button-on-outline" size={25} />
              ) : (
                <Ionicons name="radio-button-off-outline" size={25} />
              )}
              <Text style={styles.options}>{likelihoodoption}</Text>
            </Pressable>
          ))}

        <Text style={styles.heading}>Impact</Text>

        {permittedImpactValues?.length &&
          permittedImpactValues.map((impactOption) => (
            <Pressable
              flexDirection="row"
              alignItems="center"
              onPress={() => {
                setImpactValue(impactOption);
              }}
              key={impactOption}
            >
              {impactValue == impactOption ? (
                <Ionicons name="radio-button-on-outline" size={25} />
              ) : (
                <Ionicons name="radio-button-off-outline" size={25} />
              )}
              <Text style={styles.options}>{impactOption}</Text>
            </Pressable>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default EditRiskMatrixScreen;

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
    paddingTop: 30,
  },
});
