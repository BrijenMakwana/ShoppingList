import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export type CheckBoxProps = {
  isChecked: boolean;
  onPress: () => void;
}

const CheckBox = (props: CheckBoxProps) => {

  const iconName = props.isChecked ? "radio-button-on" : "radio-button-off";
  const iconColor = props.isChecked ? "#f1a200" : "#fff";

  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Ionicons name={iconName} size={24} color={iconColor} />
    </Pressable>
  )
}

export default CheckBox

const styles = StyleSheet.create({
    container:{
        marginRight: 10
    }
})