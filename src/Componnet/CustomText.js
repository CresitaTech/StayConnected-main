import React from "react";
import { Text } from "react-native";

const CustomText = ({ style, children }) => {
  return <Text style={style}>{children}</Text>;
};

export default CustomText;
