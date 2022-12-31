import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";
import RiskLevelDisplay from "./RiskLevelDisplay";

const PageEditIndexCard = ({ navigation }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);



  //Additional Index Card Items
  const cardLabel = [];
  const cardElement = [];
  for (let index = 1; index < 5; index++) {
    label =
      userProfile.currentRegistryData["Meta"]["LabelsOnIndexCard"][
        "Position" + index
      ];

    if (label && userProfile.pageBeingEdited) {
      let prefix =
        userProfile.currentRegistryData["Meta"]["PageElements"][label][
          "TextBefore"
        ] ?? "";

      let postfix =
        userProfile.currentRegistryData["Meta"]["PageElements"][label][
          "TextAfter"
        ] ?? "";
       cardLabel[index] =
        prefix + userProfile.pageBeingEdited[label] ?? "" + postfix;
      cardElement[index] = label;
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.colleft}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            navigation.push("Edit Risk Matrix Screen", {
              x_axis: "Likelihood",
              y_axis: "Impact",
            })
          }
        >
          <RiskLevelDisplay
            likelihood={userProfile.pageBeingEdited["Likelihood"]}
            impact={userProfile.pageBeingEdited["Impact"]}
          />
        </Pressable>

        {cardLabel[1] && (
          <Pressable
            style={{ flex: 1 }}
            onPress={() =>
              navigation.push("Edit ShortText Screen", {
                elementToEdit: cardElement[1],
              })
            }
          >
            <Text style={styles.label}>{cardLabel[1]}</Text>
          </Pressable>
        )}

        {cardLabel[2] && (
          <Pressable
            style={{ flex: 1 }}
            onPress={() =>
              navigation.push("Edit ShortText Screen", {
                elementToEdit: cardElement[2],
              })
            }
          >
            <Text style={styles.label}>{cardLabel[2]}</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.colright}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            navigation.push("Edit ShortText Screen", {
              elementToEdit: "Title",
            })
          }
        >
          <Text style={styles.title}>{userProfile.pageBeingEdited["Title"] ?? ""}</Text>
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            navigation.push("Edit ShortText Screen", {
              elementToEdit: cardElement[3],
            })
          }
        >
          {cardLabel[3] && <Text style={styles.label}>{cardLabel[3]}</Text>}
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            navigation.push("Edit ShortText Screen", {
              elementToEdit: cardElement[4],
                          })
          }
        >
          {cardLabel[4] && <Text style={styles.label}>{cardLabel[4]}</Text>}
        </Pressable>
      </View>
    </View>
  );
};

export default PageEditIndexCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    minHeight: 80,
    backgroundColor: "#efe5cc",
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  colleft: {
    flexDirection: "column",
    padding: 5,
  },
  colright: {
    flexDirection: "column",
    padding: 10,
    flex: 1,
  },
  label: {
    flex: 1,
    fontWeight: "normal",
    paddingTop: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 10,
    flex5: 1,
  },
});
