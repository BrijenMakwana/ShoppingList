import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export type HeaderProps = {
    total: number;
    onAllList: () => void;
    onDeleteAll: () => void;
}


const Header = (props: HeaderProps) => {
    const [date,setDate] = useState(new Date());
  return (
    <View style={styles.container}>
        <Pressable style={styles.topContainer} onPress={props.onAllList}>
            <Text style={styles.heading}>Shopping List</Text>
            <Text style={styles.totalItems}>({props.total})</Text>
            <Pressable style={styles.delete} onPress={props.onDeleteAll}>
                <MaterialIcons name="delete" size={35} color="#FF6768" />
            </Pressable>
        </Pressable>
        <Text style={styles.date}>Date: {date.toISOString().substring(0,10)}</Text>
    </View>
  )
}


export default Header

const styles = StyleSheet.create({
    container:{
        padding: 10,
    },
    topContainer:{
        flexDirection: "row",
        marginTop: Platform.OS === "android" ? 50 : 0,
        // backgroundColor: "red",
        alignItems: "center"
    },
    heading:{
        color: "#fff",
        fontSize: 40,
        marginLeft: 10,
        
    },
    totalItems:{
        color: "#D8E9A8",
        fontSize: 40,
        marginLeft: 10
    },
    delete:{
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        marginLeft: 10
      },
    date:{
        color: "#606060",
        fontSize: 17,
        marginTop: 15,
        marginLeft: 10
    }
})