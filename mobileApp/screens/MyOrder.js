import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const myMail= await AsyncStorage.getItem('userEmail');

    const response = await fetch("https://foodwinzo.vercel.app/api/auth/myOrderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: myMail,
      }),
    });
    const data = await response.json();
    console.log(data)
    if(data){
      setOrderData([data]);
    }
  };
  
  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        {Array.isArray(orderData) && orderData.map((data) =>
          data.orderData ? (
            data.orderData.order_data.slice(0).reverse().map((item) => (
              item.map((arrayData) => (
                <View key={arrayData.id}>
                  {arrayData.Order_date ? (
                    <View style={styles.dateContainer}>
                      <View style={styles.hrLine}></View>
                      <Text style={styles.dateText}>{arrayData.Order_date}</Text>
                    </View>
                  ) : (
                    <View style={styles.cardContainer}>
                      <View style={styles.card}>
                        <Image source={{ uri: arrayData.img }} style={styles.cardImage} />
                        <View style={styles.cardBody}>
                          <Text style={styles.cardTitle}>{arrayData.name}</Text>
                          <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>{arrayData.qty}</Text>
                            <Text style={styles.infoText}>{arrayData.size}</Text>
                            <Text style={styles.infoText}>{arrayData.Order_date}</Text>
                            <Text style={styles.priceText}>₹{arrayData.price}/-</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              ))
            ))
          ) : (
            <Text>No Orders</Text>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dateContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hrLine: {
    height: 4,
    width: 400,
    backgroundColor: 'black',
  },
  cardContainer: {
    marginVertical: 10,
    justifyContent:"center",
    alignItems:"center"
  },
  card: {
    width: 300,
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5,
  },
  cardImage: {
    width: 450,
    height: 120,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
