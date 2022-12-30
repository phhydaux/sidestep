import React, {  useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView , useWindowDimensions} from "react-native";

import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

import Animated, {
  Layout,
  FadeOutUp,
  ZoomIn,
} from "react-native-reanimated";

const FilterSelector = ({
  filterSelectorVisible,
  setFilterSelectorVisible,
}) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);



 
  //get all page elements
  let allPageElements = Object.keys(userProfile.currentRegistryData["Meta"]["PageElements"]);
  
  let availableFilters = allPageElements.filter((element)=>{
return((userProfile.currentRegistryData["Meta"]["PageElements"][element]["Type"]=="List") && (userProfile.currentRegistryData["Meta"]["PageElements"][element]["UseToFilter"]==true))

  })
//N.B. availableFilters is an array


  return (
    <Animated.View
      layout={Layout.duration(300)}
      entering={ZoomIn.duration(300)}
      exiting={FadeOutUp.duration(300)}
      style={
        {
          position: "absolute",
          backgroundColor: "#f5ecc9",
          top: 125,
          width: "50%",
          maxHeight: (useWindowDimensions().height)*0.7,
          zIndex: 1,
          borderRadius: 15,
          overflow: "hidden",
          opacity: 0.9,
        }}
    >
     
        <ScrollView>
          {availableFilters.map(
            (filter, filterIndex) => (
              <View key={filter} style={styles.filterGroups}>
                <Text
                  style={styles.filterHeading}
                >
                  {filter}
                </Text>

                <View>
                  {Object.keys(userProfile.currentRegistryData["Meta"]["PageElements"][filter]["PermittedValues"]).map(
                    (option, optionIndex) => (
                      <Pressable
                        onPress={() => {
                          setFilterSelectorVisible(false);

                          setUserProfile({
                            ...userProfile,
                            currentFilterName: filter,
                            currentOptionName: option,
                          });
                        }}
                        key={option}
                      >
                        <Text style={styles.options}>
                          {option}
                        </Text>
                      </Pressable>
                    )
                  )}
                </View>
              </View>
            )
          )}

          <Pressable
            onPress={() => {
              setFilterSelectorVisible(false);

              setUserProfile({
                ...userProfile,
                
                currentFilterName: null,
                
                currentOptionName: null,
              });
            }}
          >
            <Text style={styles.options}>Clear all filters</Text>
          </Pressable>
          
        </ScrollView>
        
    </Animated.View>
  );
};

export default FilterSelector;

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
