import React, { useState, useContext, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import RiskLevelBadge from "./RiskLevelBadge";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";
import RiskLevelDisplay from "./RiskLevelDisplay";
import EditTitleModal from "../components/EditTitleModal";
import EditElementModal from "./EditShortTextModal";
import { createNativeWrapper } from "react-native-gesture-handler";
import EditShortTextModal from "./EditShortTextModal";
import EditListModal from "./EditListModal";
import EditRiskMatrixModal from "./EditRiskMatrixModal";

const PageEditIndexCard = ({ pageBeingEdited, setPageBeingEdited }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
  const [shortText, setShortText] = useState();
  const [editShortTextModalVisible, setEditShortTextModalVisible] =
    useState(false);
  const [editListModalVisible, setEditListModalVisible] = useState(false);
  const [permittedValues, setPermittedValues] = useState();
  const [selection, setSelection] = useState();

  const [editRiskMatrixModalVisible, setEditRiskMatrixModalVisible] =
    useState(false);
  const [permittedLikeValues, setPermittedLikeValues] = useState();
  const [permittedImpactValues, setPermittedImpactValues] = useState();
  const [likeValue, setLikeValue] = useState();
  const [impactValue, setImpactValue] = useState();

  const handleElementBeingEdited = (pageElement) => {
    //setElementBeingEdited(pageElement);
    //elementBeingEdited.current = pageElement;
    if (pageElement == "RiskMatrix") {
      setPermittedLikeValues(
        Object.keys(
          userProfile.currentRegistryData["Meta"]["PageElements"]["Likelihood"][
            "PermittedValues"
          ]
        )
      );
      setPermittedImpactValues(
        Object.keys(
          userProfile.currentRegistryData["Meta"]["PageElements"]["Impact"][
            "PermittedValues"
          ]
        )
      );
      setLikeValue(pageBeingEdited["Likelihood"]);
      setImpactValue(pageBeingEdited["Impact"]);
      setEditRiskMatrixModalVisible(true);
    } else {
      switch (
        userProfile.currentRegistryData["Meta"]["PageElements"][pageElement][
          "Type"
        ]
      ) {
        case "ShortText":
          setUserProfile({
            ...userProfile,
            currentPageElement: pageElement,
          });
          setShortText(pageBeingEdited[pageElement]);
          setEditShortTextModalVisible(true);
          break;

        case "TextBlock":
          console.log("Text Block selected");
          return (
            <View>
              <Text>Text Block placeholder</Text>
            </View>
          );
          break;

        case "Date":
          console.log("Date selected");
          return (
            <View>
              <Text>Date placeholder</Text>
            </View>
          );
          break;

        case "List":
          setPermittedValues(
            Object.keys(
              userProfile.currentRegistryData["Meta"]["PageElements"][
                pageElement
              ]["PermittedValues"]
            )
          );

          setUserProfile({
            ...userProfile,
            currentPageElement: pageElement,
          });

          setSelection(pageBeingEdited[pageElement]);
          setEditListModalVisible(true);

          break;

        default:
          console.log("Default selected");
          alert("Screw up on editer selection");
          return (
            <View>
              <Text>Default placeholder</Text>
            </View>
          );
      }
    }
  };

  //Additional Index Card Items
  const cardLabel = [];
  const cardElement = [];
  for (let index = 1; index < 5; index++) {
    label =
      userProfile.currentRegistryData["Meta"]["LabelsOnIndexCard"][
        "Position" + index
      ];

    if (label) {
      let prefix =
        userProfile.currentRegistryData["Meta"]["PageElements"][label][
          "TextBefore"
        ] ?? "";

      let postfix =
        userProfile.currentRegistryData["Meta"]["PageElements"][label][
          "TextAfter"
        ] ?? "";

      cardLabel[index] = prefix + pageBeingEdited[label] + postfix;
      cardElement[index] = label;
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.colleft}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => handleElementBeingEdited("RiskMatrix")}
        >
          <RiskLevelDisplay
            likelihood={pageBeingEdited["Likelihood"]}
            impact={pageBeingEdited["Impact"]}
          />
        </Pressable>

        {cardLabel[1] && (
          <Pressable
            style={{ flex: 1 }}
            onPress={() => handleElementBeingEdited(cardElement[1])}
          >
            <Text style={styles.label}>{cardLabel[1]}</Text>
          </Pressable>
        )}

        {cardLabel[2] && (
          <Pressable
            style={{ flex: 1 }}
            onPress={() => handleElementBeingEdited(cardElement[2])}
          >
            <Text style={styles.label}>{cardLabel[2]}</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.colright}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => handleElementBeingEdited("Title")}
        >
          <Text style={styles.title}>{pageBeingEdited["Title"]}</Text>
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => handleElementBeingEdited(cardElement[3])}
        >
          {cardLabel[3] && <Text style={styles.label}>{cardLabel[3]}</Text>}
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => handleElementBeingEdited(cardElement[4])}
        >
          {cardLabel[4] && <Text style={styles.label}>{cardLabel[4]}</Text>}
        </Pressable>
      </View>
      {/* <EditTitleModal
        editTitleModalVisible={editTitleModalVisible}
        setEditTitleModalVisible={setEditTitleModalVisible}
        pageBeingEdited={pageBeingEdited}
        setPageBeingEdited={setPageBeingEdited}
      /> */}
      <EditShortTextModal
        editShortTextModalVisible={editShortTextModalVisible}
        setEditShortTextModalVisible={setEditShortTextModalVisible}
        pageBeingEdited={pageBeingEdited}
        setPageBeingEdited={setPageBeingEdited}
        shortText={shortText}
        setShortText={setShortText}
      />
      {/*  <EditTextBlockModal
        editElementModalVisible={editElementModalVisible}
        setEditElementModalVisible={() => setEditElementModalVisible()}
        pageBeingEdited={pageBeingEdited}
        setPageBeingEdited={() => setPageBeingEdited()}
        elementBeingEdited={elementBeingEdited}
      />
      <EditDateModal
        editElementModalVisible={editElementModalVisible}
        setEditElementModalVisible={() => setEditElementModalVisible()}
        pageBeingEdited={pageBeingEdited}
        setPageBeingEdited={() => setPageBeingEdited()}
        elementBeingEdited={elementBeingEdited}
      />*/}
      <EditListModal
        editListModalVisible={editListModalVisible}
        setEditListModalVisible={setEditListModalVisible}
        pageBeingEdited={pageBeingEdited}
        setPageBeingEdited={setPageBeingEdited}
        permittedValues={permittedValues}
        setPermittedValues={setPermittedValues}
        selection={selection}
        setSelection={setSelection}
      />
      <EditRiskMatrixModal
        editRiskMatrixModalVisible={editRiskMatrixModalVisible}
        setEditRiskMatrixModalVisible={setEditRiskMatrixModalVisible}
        pageBeingEdited={pageBeingEdited}
        setPageBeingEdited={setPageBeingEdited}
        permittedLikeValues={permittedLikeValues}
        setPermittedLikeValues={setPermittedLikeValues}
        permittedImpactValues={permittedImpactValues}
        setPermittedImpactValues={setPermittedImpactValues}
        likeValue={likeValue}
        setLikeValue={setLikeValue}
        impactValue={impactValue}
        setImpactValue={setImpactValue}
      />
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
