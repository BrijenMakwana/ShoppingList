import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import AddButton from './components/AddButton';
import Header from './components/Header';
import ShoppingItem from './components/ShoppingItem';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Header/>
        <StatusBar style="light" />
        <ShoppingItem title='Brown Rice' isChecked={true}/>
        <ShoppingItem title='Lot' isChecked={true}/>
        <ShoppingItem title='Milk' isChecked={true}/>
        <ShoppingItem title='Oil' isChecked={true}/>
        <ShoppingItem title='Washing Powder' isChecked={true}/>
      </View>
      <View style={styles.buttonContainer}>
        <AddButton/>
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

  }
});
