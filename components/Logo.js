import * as React from "react";
import { View } from "react-native";

const Logo = ({ size }) => {
  const redish = "#FF0404";
  const yellowish = "#FFD056";
  const greenish = "#07CF0F";

  return (
    <View style={{ flexBasis: "auto", flexDirection: "column" }}>
      <View style={{ flexBasis: "auto", flexDirection: "row" }}>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: redish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: redish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: redish }}
        ></View>
      </View>
      <View style={{ flexBasis: "auto", flexDirection: "row" }}>
        <View
          style={{ height: size, width: size, backgroundColor: greenish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: redish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: redish }}
        ></View>
      </View>
      <View style={{ flexBasis: "auto", flexDirection: "row" }}>
        <View
          style={{ height: size, width: size, backgroundColor: greenish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: redish }}
        ></View>
      </View>
      <View style={{ flexBasis: "auto", flexDirection: "row" }}>
        <View
          style={{ height: size, width: size, backgroundColor: greenish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: greenish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
      </View>
      <View style={{ flexBasis: "auto", flexDirection: "row" }}>
        <View
          style={{ height: size, width: size, backgroundColor: greenish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: greenish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: greenish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: greenish }}
        ></View>
        <View
          style={{ height: size, width: size, backgroundColor: yellowish }}
        ></View>
      </View>
    </View>
  );
};

export default Logo;
