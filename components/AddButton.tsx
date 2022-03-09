import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const AddButton = () => {
  return (
    <Pressable style={styles.container}>
        <Ionicons name="ios-add" size={24} color="black" />
        <Text style={styles.title}>Add new item</Text>
    </Pressable>
  )
}

export default AddButton

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#f1a200",
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 10,
        borderRadius: 10
    },
    title:{
        color: "#000",
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 5
    }
})