import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";

import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import AuthStack from "./AuthStack";

import { auth, database } from "../firebaseConfig";
import HomePageNavigator from "./HomePageNavigator";
import { ref, set, onValue } from "firebase/database";

export default function RootNavigator() {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber

    const unsubscribeAuth = auth.onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        //a user is logged on
        const userRef = ref(database, "/Users/" + authenticatedUser.uid);

        onValue(
          userRef,
          (snapshot) => {
            if (snapshot.exists()) {
              //returning user
              setUserProfile({
                currentUser: authenticatedUser.uid,
                Name: snapshot.val()["Name"],
                newAccount: false,
              });
            } else {
              //new user
              setUserProfile({
                Name: "Anonymous",
                newAccount: true,
              });
            }
            setIsLoading(false);
          },
          []
        );
      } else {
        //no user is logged in
        setUserProfile(null);
        setIsLoading(false);
      }
    });
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userProfile ? <HomePageNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
