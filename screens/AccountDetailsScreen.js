import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button, InputField, ErrorMessage } from "../components";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

import { auth, database } from "../firebaseConfig";
import { set, ref } from "firebase/database";

export default function AccountDetailsScreen({ navigation }) {
  const {  userProfile, setUserProfile } = useContext(
    AuthenticatedUserContext
  );

  const [email, setEmail] = useState(auth.currentUser.email);
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");
  const [displayName, setDisplayName] = useState(userProfile.Name);

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleConfirm = () => {
    set(ref(database, "/Users/" + auth.currentUser.uid + "/Name"), {displayName});
    set(ref(database, "/Users/" + auth.currentUser.uid + "/Email"), {email});
    setUserProfile({
      //Email: email,
     // Name: displayName,
      newAccount: false,
    });

    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="email"
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="lock"
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="account"
        placeholder="Enter Account Name"
        autoCapitalize="words"
        autoCorrect={false}
        textContentType="name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <Button
        onPress={handleConfirm}
        backgroundColor="#f57c00"
        title="Confirm Details"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />
    </View>
  );
}

const styles = new StyleSheet.create({
  button: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 10,
    paddingRight: 50,

    width: "100%",
  },
  bodytext: {
    padding: 15,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  textcontainer: {
    flex: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
