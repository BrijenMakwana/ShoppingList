import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export type CheckBoxProps = {
  isChecked: boolean;
  onPress: () => void;
}

const CheckBox = (props: CheckBoxProps) => {

  // change the following data based on isChecked property
  const iconName = props.isChecked ? "radio-button-on" : "radio-button-off";
  const iconColor = props.isChecked ? "#D8E9A8" : "#fff";

  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Ionicons name={iconName} size={24} color={iconColor} />
    </Pressable>
  )
}

export default CheckBox

const styles = StyleSheet.create({
    container:{
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        height:35
    }
})