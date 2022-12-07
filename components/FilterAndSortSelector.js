import React, { useState, useContext } from "react";
import { Modal, StyleSheet, Text, View, Pressable } from "react-native";
import Button from "./Button";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";


import Animated, {
  useAnimatedStyle,
  AnimatedLayout,
  withSequence,
  withRepeat,
  useSharedValue,
  withTiming,
  withSpring,
  withDelay,
  SlideInRight,
  FlipOutEasyX,
  LinearTransition,
  ZoomInDown,
  ZoomInUp,
  Layout,
  FlipInEasyX,
  combineTransition,
  FadeOut,
  FadeIn,
  EntryExitTransition,
} from "react-native-reanimated";

const FilterAndSortSelector = ({
  filterSortSelectorVisible,
  setFilterSortSelectorVisible,
}) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  // Collect the data required
  // Array of Filter Group names
  let availableFilters = Object.keys(userProfile.JSObjOfAllSelections);

  let currentFilter = "Hazard Group";

  const experimental = useSharedValue();

  if (filterSortSelectorVisible) {
    experimental.value = 1;
  } else {
    experimental.value = withDelay(1000, withTiming(0));
  }

  const animatedStyles = useAnimatedStyle(()=>{
return{
  borderWidth: experimental.value
}
 



  })

  let currentSelectionOptions = Object.keys(
    userProfile.JSObjOfAllSelections[currentFilter]
  );

  return (
    <Animated.View
      
     layout={Layout.duration(900)}
    
      style={[{
        position: "absolute",
        backgroundColor: "#f5ecc9",
        top: 117,
        width: "50%",
       
        zIndex: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: "hidden",
        opacity: 0.9,
      }, animatedStyles]}
    >
      {filterSortSelectorVisible && (
        <View>
          {Object.keys(userProfile.JSObjOfAllSelections).map(
            (filter, filterIndex) => (
              <View key={filter} style={styles.filterGroups}>
                <Animated.Text 
               
                exiting = {LinearTransition.delay(1000)}
                
                style={styles.filterHeading}>{filter}</Animated.Text>

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
                            currentOptionName: option,
                          });
                        }}
                        key={option}
                      >
                        <Animated.Text 
                        exiting={LinearTransition.delay(1000)}
                        
                        style={styles.options}>{option}</Animated.Text>
                      </Pressable>
                    )
                  )}
                </View>
              </View>
            )
          )}

          <Pressable
            onPress={() => {
              setFilterSortSelectorVisible(false);

              setUserProfile({
                ...userProfile,
                currentFilterIndex: null,
                currentFilterName: null,
                currentOptionIndex: null,
                currentOptionName: null,
              });
            }}
            
          >
            <Text style={styles.options}>Clear all filters</Text>
          </Pressable>
          <Text>Experimental Text</Text>
        </View>
      )}
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
