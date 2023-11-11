import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    let response = await fetch("http://foodwinzo.vercel.app/api/auth/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          navigation.navigate('Login');
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Carousel */}
      <View style={styles.carouselContainer}>
        {/* Carousel Items */}
        <View style={styles.carouselItems}>
          <View style={styles.carouselCaption}>
            <Text style={styles.heading}>Food Winza</Text>
            <View style={styles.searchForm}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search available dish here..."
                placeholderTextColor="black"
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
              <TouchableOpacity style={styles.searchButton} onPress={() => setSearch('')}>
                <Text style={styles.searchButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Carousel Images */}
          <Image source={{ uri: 'https://source.unsplash.com/random/900x700/?burger' }} style={styles.carouselImage} />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        {foodCat != []
          ? foodCat.map((data) => (
              <View key={data.id} style={styles.categoryRow}>
                <Text style={styles.categoryText}>{data.CategoryName}</Text>
                <View style={styles.hrLine}></View>
                {foodItems != []
                  ? foodItems
                      .filter(
                        (items) =>
                          items.CategoryName === data.CategoryName &&
                          items.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItems) => (
                        <View key={filterItems.id} style={styles.cardContainer}>
                          <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
                        </View>
                      ))
                  : <Text>No Such Data</Text>}
              </View>
            ))
          : <Text>No Categories</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  carouselContainer: {
    alignItems: 'center',
  },
  carouselItems: {
    width: 450,
    height: 200,
  },
  carouselCaption: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  searchForm: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchInput: {
    width:280,
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    marginRight: 5,
    justifyContent: 'center',
    borderRadius:10
  },
  searchButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  carouselImage: {
    height:200,
    resizeMode: 'cover',
  },
  categoryContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  categoryRow: {
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hrLine: {
    height: 4,
    backgroundImage: '-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))',
  },
  cardContainer: {
    flex: 1,
    marginRight: 10,
  },
  heading:{
    fontSize:50,
    fontWeight:'bold',
    paddingBottom: 20,
    color:'white'
  }
});
