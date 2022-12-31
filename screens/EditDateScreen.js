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
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const EditDateScreen = ({ navigation, route }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
  const elementToEdit = route.params.elementToEdit;

  const tryit = new Date(userProfile.pageBeingEdited[elementToEdit]);
  const fallBack = new Date();
  var thisone;
  if (tryit.toString() == "Invalid Date") {
    thisone = fallBack;
  } else {
    thisone = tryit;
  }
  

  const [date, setDate] = useState(thisone);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  

  const saveToStaging = () => {
    const copyOfPage = JSON.parse(JSON.stringify(userProfile.pageBeingEdited));
    const myMonthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const myDateString = date.getDate() + " " + myMonthArray[date.getMonth()] + " " + date.getFullYear();
    copyOfPage[elementToEdit] = myDateString;

    setUserProfile({
      ...userProfile,
      pageBeingEdited: { ...copyOfPage },
    });

    navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const keys = Object.keys(event);
    console.log("Event" + event.type);

    //setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
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
   

    
    <View style={{
    }}>
     
     
      <Text style={{padding: 20,
      }}>Full datetime code: {date.toString()}</Text>


      <View style={{ flexGrow: 1,
      flexDirection: "row",
      alignitems: "center",
      justifyContent: "center",}}>
        
        <DateTimePicker
        style={{
          width: 100,
        }}
          testID="dateTimePicker"
      display="compact"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        /></View>
      
    </View>
  </SafeAreaView>
  );
};

export default EditDateScreen;

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
