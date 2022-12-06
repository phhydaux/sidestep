import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, Pressable } from "react-native";

import Registry from "../dataStore/dataSource";
import RadioButton from "./RadioButton";

const FilterSelector = ({
  FilterModalVisible,
  setFilterModalVisible,
  currentFilter,
  setCurrentFilter,
  availableFilters,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={FilterModalVisible}
      presentationStyle="overFullScreen"
      onRequestClose={() => {
        Alert.alert("Another Modal has been closed.");
        setFilterModalVisible(!FilterModalVisible);
      }}
    >
      <Pressable
        onPress={() => {
          setFilterModalVisible(!FilterModalVisible);
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
            <View style={{ flexDirection: "column" }}>
              <Text>Display this registry, divided by:</Text>

              {availableFilters.map((filter) => (
                <Pressable
                  onPress={() => {
                    setCurrentFilter(filter);
                    setFilterModalVisible(!FilterModalVisible);
                  }}
                  key={filter}
                >
                  <View style={styles.FilterView}>
                    <Text style={styles.filter}>{filter}</Text>
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

export default FilterSelector;

const styles = StyleSheet.create({
  filter: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  FilterView: {},
  paragraph: {},
});
