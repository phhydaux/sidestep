import React, { useState, useContext } from "react";
import { Modal, StyleSheet, Text, View, Pressable } from "react-native";
import Button from "./Button";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

import RadioButton from "./RadioButton";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withRepeat,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";

const FilterAndSortSelector = ({
  filterSortSelectorVisible,
  setFilterSortSelectorVisible,
}) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const visibility = useSharedValue(0);
  const sharedOpacity = useSharedValue(0);

  // Collect the data required
  // Array of Filter Group names
  let availableFilters = Object.keys(userProfile.JSObjOfAllSelections);

  let currentFilter = "Hazard Group";

  let currentSelectionOptions = Object.keys(
    userProfile.JSObjOfAllSelections[currentFilter]
  );

  //Calculate length of menu
  let countOfGroups = 0;
  let countOfOptions = 0;
  availableFilters.forEach((filter) => {
    countOfGroups++;
    Object.keys(userProfile.JSObjOfAllSelections[filter]).forEach((option)=>{
      countOfOptions++
    })
  });
  let menuSize = countOfGroups * 50 + countOfOptions * 50 + 20;


  // Array of Filters

  if (filterSortSelectorVisible) {
    visibility.value = withSpring(menuSize);
    sharedOpacity.value = withTiming(1);
  } else {
    visibility.value = withTiming(0);
    sharedOpacity.value = withTiming(0);
  }

  const animatedFilterStyle = useAnimatedStyle(() => {
    return {
      height: visibility.value,
      opacity: sharedOpacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          backgroundColor: "wheat",
          top: 127,
          width: "50%",
          borderWidth: 1,
          zIndex: 1,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        },
        animatedFilterStyle,
      ]}
    >
      
      <View>
        {Object.keys(userProfile.JSObjOfAllSelections).map((filter, filterIndex) => (
          <View key={filter} style={styles.filterGroups}>
            <Text style={styles.filterHeading}>{filter}</Text>

            <View>
              {Object.keys(userProfile.JSObjOfAllSelections[filter]).map(
                (option, optionIndex) => (
                  <Pressable
                    onPress={() => {
                      setFilterSortSelectorVisible(false);
                      setUserProfile({
                        ...userProfile,
                        currentFilterIndex: filterIndex,
                        currentFilterName: filter,
                        currentOptionIndex: optionIndex,
                        currentOptionName: option
                      })}}
                    key={option}
                  >
                    <Text style={styles.options}>{option}</Text>
                  </Pressable>
                )
              )}
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

export default FilterAndSortSelector;

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
