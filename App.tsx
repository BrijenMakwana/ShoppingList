import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Header from './components/Header';
import ShoppingItem from './components/ShoppingItem';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <StatusBar style="light" />
      <ShoppingItem title='Brown Rice' isChecked={true}/>
      <ShoppingItem title='Lot' isChecked={true}/>
      <ShoppingItem title='Milk' isChecked={true}/>
      <ShoppingItem title='Oil' isChecked={true}/>
      <ShoppingItem title='Washing Powder' isChecked={true}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050504',
  },
});
