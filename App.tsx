import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, ToastAndroid, Platform, Modal, TextInput, Pressable, ActivityIndicator } from 'react-native';
import AddButton from './components/AddButton';
import Header from './components/Header';
import ShoppingItem from './components/ShoppingItem';
import { EvilIcons } from '@expo/vector-icons';
import {db,collection, getDocs,addDoc,doc,query,where} from "./Config";
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [shoppingList,setShoppingList] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem,setNewItem] = useState("");
  const [uniqueId,setUniqueId] = useState("");

  LogBox.ignoreLogs(['Setting a timer for a long period of time']);

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
  
  const getShoppingList = async() => {

      const shoppingCol = query(collection(db, "Shopping"), where("uniqueId", "==", uniqueId));
      const shoppingSnapshot = await getDocs(shoppingCol);
      setShoppingList(shoppingSnapshot.docs.map((doc)=>({...doc.data(),id: doc.id})));
    
  }

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
        <Header total={shoppingList.length}/>
        {shoppingList &&
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
          ListFooterComponent={
            <View style={{height: 20}}></View>
          }
        />  }     
      </View>
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
            <Pressable style={{alignSelf: "flex-end",alignItems: "center",justifyContent: "center"}} onPress={()=>setModalVisible(false)}>
              <EvilIcons name="close-o" size={30} color="#D8E9A8" />
            </Pressable>
            
            <TextInput
              placeholder='add new item'
              value={newItem}
              onChangeText={(text)=>setNewItem(text)}
              onSubmitEditing={addShoppingItem}
              style={styles.input}
              autoFocus
            />
            <Pressable style={styles.button} onPress={addShoppingItem}>
              <Text style={styles.buttonText}>Add</Text>
            </Pressable>
          </View>
          
        </View>
      </Modal>
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
    backgroundColor: "#f1a200",
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
