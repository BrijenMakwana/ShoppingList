import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export type HeaderProps = {
    total: number;
}

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <Text style={styles.heading}>Shopping List</Text>
            <Text style={styles.totalItems}>({props.total})</Text>
        </View>
        <Text style={styles.date}>Last modified: 30 Jun 2022 9:22 AM</Text> 
      
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        padding: 10,
        // backgroundColor: "red"
    },
    topContainer:{
        flexDirection: "row",
        marginTop: Platform.OS === "android" ? 50 : 0
    },
    heading:{
        color: "#fff",
        fontSize: 40,
        marginLeft: 10,
        
    },
    totalItems:{
        color: "#f1a200",
        fontSize: 40,
        marginLeft: 10
    },
    date:{
        color: "#606060",
        fontSize: 17,
        marginTop: 15,
        marginLeft: 10
    }
})