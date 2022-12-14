import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

import Animated, { Layout, FadeOutUp, ZoomIn } from "react-native-reanimated";

const SortSelector = ({ sortSelectorVisible, setSortSelectorVisible }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  //let availableCriteria = Object.keys(userProfile.currentRegistryData["Meta"]["SortOptions"]);

  let allPageElements = Object.keys(
    userProfile.currentRegistryData["Meta"]["PageElements"]
  );

  let availableCriteria = allPageElements.filter((element) => {
    console.log(element);
console.log(userProfile.currentRegistryData["Meta"]["PageElements"][element]["Type"]);
console.log(userProfile.currentRegistryData["Meta"]["PageElements"][element]["UseToSort"]);


    return (
      userProfile.currentRegistryData["Meta"]["PageElements"][element][
        "UseToSort"
      ] == true
    );
  });

  console.log("available");
  console.log(availableCriteria);

  return (
    <Animated.View
      layout={Layout.duration(300)}
      entering={ZoomIn.duration(300)}
      exiting={FadeOutUp.duration(300)}
      style={{
        position: "absolute",
        backgroundColor: "#f5ecc9",
        top: 125,
        left: "50%",
        width: "50%",
        zIndex: 1,
        borderRadius: 15,
        overflow: "hidden",
        opacity: 0.9,
      }}
    >
      <View>
        {availableCriteria.map((sortOptionName, sortOptionIndex) => (
          <Pressable
            onPress={() => {
              setSortSelectorVisible(false);

              let reverse = null;
              if (userProfile.sortOptionName == sortOptionName) {
                reverse = !userProfile.sortReverse;
              } else {
                reverse = false;
              }

              setUserProfile({
                ...userProfile,
                sortOptionName: sortOptionName,
                sortReverse: reverse
              });
            }}
            key={sortOptionName}
          >
            <Text style={styles.options}>{sortOptionName}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => {
          setSortSelectorVisible(false);

          setUserProfile({
            ...userProfile,

            sortOptionIndex: null,
            sortOptionName: null,
          });
        }}
      >
        <Text style={styles.options}>Unsorted</Text>
      </Pressable>
    </Animated.View>
  );
};

export default SortSelector;

const styles = StyleSheet.create({
  paragraph: {},
  filterGroups: {
    flexGrow: 1,
    border: 1,
  },
  filterHeading: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 5,
  },
  options: {
    fontSize: 22,
    padding: 10,
    color: "blue",
  },
});
