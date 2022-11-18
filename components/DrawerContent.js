import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import Logo from "./Logo";


const DrawerContent = (props) => {
    
  return (
    <DrawerContentScrollView {...props}>
    <View style={styles.ryxkContainer}>
    <Logo size={12}/>
    <Text style={styles.ryxk}>RYXK</Text>
    </View>
   
      <DrawerItemList {...props} />
      <DrawerItem 
      label="Account" />
      <DrawerItem 
      label="Change Password" />
      <DrawerItem 
      label="Terms and Conditions" />
      <DrawerItem 
      label="Help" />
      <DrawerItem 
      label="Contact Us" />

      

    </DrawerContentScrollView>
  );
};

export default DrawerContent;


const styles = new StyleSheet.create({

    ryxk: {
        fontSize: 40,
        paddingLeft: 10,

    },
    ryxkContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    }
})