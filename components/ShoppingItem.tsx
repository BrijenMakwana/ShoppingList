import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CheckBox from './CheckBox';

export type ShoppingItemProps = {
  isChecked: boolean;
  title: string;
}

const ShoppingItem = (props: ShoppingItemProps) => {
  const [isChecked,setIsChecked] = useState(props.isChecked);

  return (
    <View style={styles.container}>
        <CheckBox isChecked={isChecked} onPress={()=>setIsChecked(!isChecked)}/>
        <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

export default ShoppingItem

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: "#282828",
        width: "90%",
        borderRadius: 5,
        padding: 13,
        alignItems: "center",
        marginTop: 17
    },
    title:{
        color: "#fff",
        fontSize: 20
    }
})