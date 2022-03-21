import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, ToastAndroid, Platform, Modal, TextInput, Pressable, ActivityIndicator } from 'react-native';
import AddButton from './components/AddButton';
import Header from './components/Header';
import ShoppingItem from './components/ShoppingItem';
import { EvilIcons,Entypo } from '@expo/vector-icons';
import {db,collection, getDocs,addDoc,doc,query,where,deleteDoc} from "./Config";
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // store entire list
  const [shoppingList,setShoppingList] = useState<any>([]);
  // total items in the list
  const [totalItems,setTotalItems] = useState(0);

  // is modal visible or not for add new item
  const [modalVisible, setModalVisible] = useState(false);
  // new item string
  const [newItem,setNewItem] = useState("");
  // unique id for each smartphone
  const [uniqueId,setUniqueId] = useState("");

  LogBox.ignoreLogs(['Setting a timer for a long period of time']);

  // generate new id if not already present
  const generateId = async() => {
    try {
      const id = await AsyncStorage.getItem('id')
      if(id !== null) {
        setUniqueId(id);
        getShoppingList();
      }
      else{
        const newId = Math.random().toString();
        setUniqueId(newId);
        await AsyncStorage.setItem('id', uniqueId);
        
      }
      
    } catch(e) {
      // error reading value
    }
    finally{
      
    }
  }
  
  // get entire list
  const getShoppingList = async() => {

      const shoppingCol = query(collection(db, "Shopping"), where("uniqueId", "==", uniqueId));
      const shoppingSnapshot = await getDocs(shoppingCol);
      setTotalItems(shoppingSnapshot.size);
      setShoppingList(shoppingSnapshot.docs.map((doc)=>({...doc.data(),id: doc.id})));
    
  }

  // delete entire list
  const deleteShoppingList = async() => {

    const shoppingCol = query(collection(db, "Shopping"), where("uniqueId", "==", uniqueId));
    const shoppingSnapshot = await getDocs(shoppingCol);
    shoppingSnapshot.docs.map((item)=>{
      deleteDoc(doc(db, "Shopping", item.id))
    });
    if(Platform.OS === "android"){
      ToastAndroid.show("All Items Deleted", ToastAndroid.SHORT);
    }
    
    getShoppingList();
}

// add new item
  const addShoppingItem = async() => {
    try {
      const docRef = await addDoc(collection(db, "Shopping"), {
        title: newItem,
        isChecked: false,
        uniqueId: uniqueId
      });
      if(Platform.OS === "android"){
        ToastAndroid.show(`${newItem} added`, ToastAndroid.SHORT);
      }
      getShoppingList();
      setModalVisible(false);
      setNewItem("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // open new item modal
  const openModal = () => {
    setModalVisible(true);
   
  }

  useEffect(() => {
    generateId();
    getShoppingList();
  }, [uniqueId])

  
  return (
    <SafeAreaView style={[styles.container,{
      opacity: modalVisible ? 0.8 : 1
    }]}>
      <StatusBar style="light" />
      <View style={styles.infoContainer}>
        {/* header */}
        <Header 
          total={totalItems}
          onAllList={getShoppingList} 
          onDeleteAll={deleteShoppingList}
        />
        {/* list of items */}
          <FlatList
          data={shoppingList}
          renderItem={({item})=> 
            <ShoppingItem 
              id={item.id}
              title={item.title} 
              isChecked={item.isChecked}
              onRefresh={getShoppingList}
            />
          }
          keyExtractor={item=> item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Entypo name="shopping-cart" size={150} color="#D8E9A8" />
            </View>
            
          }
          ListFooterComponent={
            <View style={{height: 20}}></View>
          }
        />    
      </View>
      {/* modal for new item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{
          flex: 1,
          justifyContent: "flex-end",
        }}>
          <View style={{
            backgroundColor: "#050504",
            alignItems: "center",
            padding: 20,
            width: "100%",
            alignSelf: "center",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: "40%"
          }}>
            {/* close modal button */}
            <Pressable style={{alignSelf: "flex-end",alignItems: "center",justifyContent: "center"}} onPress={()=>setModalVisible(false)}>
              <EvilIcons name="close-o" size={30} color="#D8E9A8" />
            </Pressable>
            
            {/* textinput for new otem */}
            <TextInput
              placeholder='add new item'
              value={newItem}
              onChangeText={(text)=>setNewItem(text)}
              onSubmitEditing={addShoppingItem}
              style={styles.input}
              autoFocus
            />
            {/* add button */}
            <Pressable style={styles.button} onPress={addShoppingItem}>
              <Text style={styles.buttonText}>Add</Text>
            </Pressable>
          </View>
          
        </View>
      </Modal>

      {/* button to open the modal */}
      <View style={styles.buttonContainer}>
        <AddButton onPress={openModal}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323232',
  },
  infoContainer:{
    flex: 1
  },
  emptyContainer:{
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
    opacity: 0.5
  },
  buttonContainer:{

  },
  input:{
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 15,
    width: "100%",
    alignSelf: "center",
    marginTop: 20
  },
  button:{
    backgroundColor: "#D8E9A8",
    padding: 10,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  buttonText:{
    fontSize: 17,
    color: "#000",
    
  }
});
