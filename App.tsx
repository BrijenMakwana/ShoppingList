import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Alert, ToastAndroid, Platform, Modal, TextInput } from 'react-native';
import AddButton from './components/AddButton';
import Header from './components/Header';
import ShoppingItem from './components/ShoppingItem';
import {db,collection, getDocs,addDoc,onSnapshot,doc} from "./Config";

export default function App() {
  const [shoppingList,setShoppingList] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem,setNewItem] = useState("");
  
  const getShoppingList = async() => {
    const shoppingCol = collection(db, 'Shopping');
    const shoppingSnapshot = await getDocs(shoppingCol);
    setShoppingList( shoppingSnapshot.docs.map(doc => doc.data()))
  }

  const addShoppingItem = async() => {
    try {
      const docRef = await addDoc(collection(db, "Shopping"), {
        title: newItem,
        isChecked: false,
      });
      if(Platform.OS === "android"){
        ToastAndroid.show("Added", ToastAndroid.SHORT);
      }
      getShoppingList();
      setModalVisible(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const openModal = () => {
    setModalVisible(true);
  }
  
  useEffect(() => {
    getShoppingList();
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.infoContainer}>
        <Header total={shoppingList.length}/>
        <FlatList
          data={shoppingList}
          renderItem={({item})=> <ShoppingItem title={item.title} isChecked={item.isChecked}/>}
          keyExtractor={item=> item.title}
          ListFooterComponent={
            <View style={{height: 20}}></View>
          }
        />       
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          
        }}>
          <View style={{
            backgroundColor: "red",
            height: 100,
            justifyContent: "center"
          }}>
            <TextInput
              placeholder='add new item'
              value={newItem}
              onChangeText={(text)=>setNewItem(text)}
              style={styles.input}
            />
            <AddButton onPress={addShoppingItem}/>
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
    backgroundColor: '#050504',
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
    width: "90%",
    alignSelf: "center"
  }
});
