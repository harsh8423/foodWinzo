import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatchCart, useCart } from '../components/ContextReducer';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>The Cart is Empty!</Text>
      </View>
    );
  }


  const handleCheckOut = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
  
      const response = await fetch('http://foodwinzo.vercel.app/api/auth/orderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });
  
      console.log('JSON RESPONSE:::::', response.status);
  
      if (response.status === 200) {
        dispatch({ type: 'DROP' });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <View style={{ flex: 1, margin: 16 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text>{index + 1}</Text>
            <Text>{item.name}</Text>
            <Text>{item.qty}</Text>
            <Text>{item.size}</Text>
            <Text>{item.price}</Text>
            <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE', index })}>
              <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 18 }}>Total Price: {totalPrice}/-</Text>
        <Button title="Check Out" onPress={handleCheckOut} />
      </View>
    </View>
  );
}
