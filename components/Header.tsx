import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export type HeaderProps = {
    total: number;
}

export type itemTrackingProps = {
    text: string;
    number: number;
}

const Header = (props: HeaderProps) => {
    const [date,setDate] = useState(new Date());
  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <Text style={styles.heading}>Shopping List</Text>
            <Text style={styles.totalItems}>({props.total})</Text>
        </View>
        <Text style={styles.date}>Date: {date.toISOString().substring(0,10)}</Text> 
        <ItemTracking text="Purchased" number={5}/>
        <ItemTracking text="Remains" number={3}/>
        
    </View>
  )
}

const ItemTracking = (props: itemTrackingProps) => {
    return(
        <Text style={styles.tracking}>{props.text}: 
            <Text style={{fontSize:25,color: "#D8E9A8"}}>({props.number})</Text>
        </Text>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        padding: 10,
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
        color: "#D8E9A8",
        fontSize: 40,
        marginLeft: 10
    },
    date:{
        color: "#606060",
        fontSize: 17,
        marginTop: 15,
        marginLeft: 10
    },
    tracking:{
        color: "#fff",
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10
    }
})