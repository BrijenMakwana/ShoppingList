import { Platform, Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from './CheckBox';
import { MaterialIcons } from '@expo/vector-icons';
import { db, doc, deleteDoc, updateDoc} from "../Config";


export type ShoppingItemProps = {
  id: string;
  isChecked: boolean;
  title: string;
  onRefresh: () => void;
}

const ShoppingItem = (props: ShoppingItemProps) => {
  const [isChecked,setIsChecked] = useState(props.isChecked);

  const deleteShoppingItem = async() => {
    await deleteDoc(doc(db, "Shopping", props.id)).then(()=>{
      if(Platform.OS === "android"){
        ToastAndroid.show(`${props.title} removed`, ToastAndroid.SHORT);
      }
      props.onRefresh();
    });
    
  }

  const updateIsChecked = async() => {
    await updateDoc(doc(db, "Shopping", props.id),{
      isChecked: isChecked
    })
  }

  useEffect(()=>{
    updateIsChecked();
  },[isChecked])

  return (
    <View style={styles.container}>
        <CheckBox isChecked={isChecked} onPress={()=>setIsChecked(!isChecked)}/>
        <Text style={[styles.title,{
          textDecorationLine: isChecked ? "line-through" : "none",
          color: isChecked ? "#f1a200" : "#fff"
        }]}>
          {props.title}
        </Text>
        <Pressable style={styles.delete} onPress={deleteShoppingItem}>
          <MaterialIcons name="delete" size={24} color="#f1a200" />
        </Pressable>
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
        borderRadius: 10,
        padding: 13,
        alignItems: "center",
        marginTop: 17
    },
    title:{
        color: "#fff",
        fontSize: 20,
        flex: 1
    },
    delete:{
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
      
    }
})
