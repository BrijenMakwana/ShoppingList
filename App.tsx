import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, ToastAndroid, Platform, Modal, TextInput, Pressable } from 'react-native';
import AddButton from './components/AddButton';
import Header from './components/Header';
import ShoppingItem from './components/ShoppingItem';
import { EvilIcons } from '@expo/vector-icons';
import {db,collection, getDocs,addDoc,doc} from "./Config";
import { LogBox } from 'react-native';

export default function App() {
  const [shoppingList,setShoppingList] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem,setNewItem] = useState("");

  let temp: any = [];
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  
  const getShoppingList = async() => {
    const shoppingCol = collection(db, 'Shopping');
    const shoppingSnapshot = await getDocs(shoppingCol);
    shoppingSnapshot.docs.map(doc => {
      const obj = {
        id: doc.id,
        data: doc.data()
      }
      temp.push(obj)
      })
      setShoppingList(temp);
  }

  const addShoppingItem = async() => {
    try {
      const docRef = await addDoc(collection(db, "Shopping"), {
        title: newItem,
        isChecked: false,
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
    getShoppingList();
  }, [])
  
  return (
    <SafeAreaView style={[styles.container,{
      opacity: modalVisible ? 0.8 : 1
    }]}>
      <StatusBar style="light" />
      <View style={styles.infoContainer}>
        <Header total={shoppingList.length}/>
        <FlatList
          data={shoppingList}
          renderItem={({item})=> 
            <ShoppingItem 
              id={item.id}
              title={item.data.title} 
              isChecked={item.data.isChecked}
            />
          }
          keyExtractor={item=> item.id}
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
              <EvilIcons name="close-o" size={30} color="#f1a200" />
            </Pressable>
            
            <TextInput
              placeholder='add new item'
              value={newItem}
              onChangeText={(text)=>setNewItem(text)}
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
