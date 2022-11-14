import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";
import Registry from "../dataStore/dataSource";

export default function RadioButton({
  data,
  onSelect,
  displayOrder,
  setDisplayOrder,
}) {
  let newOrder = displayOrder;
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);

    switch (value) {
      
      case "Risk Matrix Result":
        
        newOrder = displayOrder.sort(sortByRiskLevel);
        setDisplayOrder(newOrder);
        break;
      case "Last Review":
        
        newOrder = displayOrder.sort(sortByLastRevDate);
        setDisplayOrder(newOrder);
        break;
      case "Next Review":
        
        newOrder = displayOrder.sort(sortByNextRevDate);
        setDisplayOrder(newOrder);
        break;

      default:
        newOrder = displayOrder.sort((a,b)=>{return Registry.entries[a].InternalID - Registry.entries[b].InternalID})
        setDisplayOrder(newOrder);
        break;
    }

    
  };
  return (
    <View>
      {data.map((item) => {
        return (
          <Pressable
            key={item.value}
            style={
              item.value === userOption ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item.value)}
          >
            <Text style={styles.option}> {item.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function sortByValue(a, b) {
  let  firstValue = Registry.entries[a].LastRev;
  let  secondValue =Registry.entries[b].LastRev;
 if (firstValue > secondValue) return (1)
 else if (secondValue > firstValue) return (-1)
 else return(0);
}
function sortByLastRevDate(a, b) {
  let  firstDate= new Date(Registry.entries[a].LastRev);
  let  secondDate=new Date(Registry.entries[b].LastRev);
  let firstValue = firstDate.getTime();
  let secondValue = secondDate.getTime();
 if (firstValue > secondValue) return (1)
 else if (secondValue > firstValue) return (-1)
 else return(0);
}
function sortByNextRevDate(a, b) {
  let  firstDate= new Date(Registry.entries[a].NextRev);
  let  secondDate=new Date(Registry.entries[b].NextRev);
  let firstValue = firstDate.getTime();
  let secondValue = secondDate.getTime();
 if (firstValue > secondValue) return (1)
 else if (secondValue > firstValue) return (-1)
 else return(0);
}
function sortByRiskLevel(a, b) {
  let firstValue = Registry.entries[a].RiskLevel;
  let secondValue = Registry.entries[b].RiskLevel;
 if (firstValue > secondValue) return (1)
 else if (secondValue > firstValue) return (-1)
 else return(0);
}
