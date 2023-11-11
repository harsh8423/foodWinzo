import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Picker, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const data = useCart();
  const navigation = useNavigation();
  const dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();

  const handleClick = () => {
    if (!localStorage.getItem('token')) {
      navigation.navigate('Login');
    }
  };

  const handleQty = (value) => {
    setQty(value);
  };

  const handleOptions = (value) => {
    setSize(value);
  };

  const handleAddToCart = async () => {
    handleClick()
    let food = data.find((item) => item.id === props.item._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: props.item._id, price: finalPrice, qty });
        return;
      } else if (food.size !== size) {
        await dispatch({ type: 'ADD', id: props.item._id, name: props.item.name, price: finalPrice, qty, size, img: props.ImgSrc });
        return;
      }
      return;
    }

    await dispatch({ type: 'ADD', id: props.item._id, name: props.item.name, price: finalPrice, qty, size, img: props.ImgSrc });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(props.options[size]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: props.ImgSrc }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{props.foodName}</Text>
          <View style={styles.selectionContainer}>
            <Picker
              style={styles.selectionPicker}
              selectedValue={qty}
              onValueChange={(value) => handleQty(value)}
            >
              {[...Array(6)].map((_, i) => (
                <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
              ))}
            </Picker>
            <Picker
              style={styles.selectionPicker}
              selectedValue={size}
              ref={priceRef}
              onValueChange={(value) => handleOptions(value)}
            >
              {Object.keys(props.options).map((i) => (
                <Picker.Item key={i} label={i} value={i} />
              ))}
            </Picker>
            <Text style={styles.priceText}>₹{finalPrice}/-</Text>
          </View>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  card: {
    width: 'auto',
    maxHeight: 360,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
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
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionPicker: {
    flex: 1,
    height: 38,
    backgroundColor: '#28a745',
    color: '#000',
    marginRight: 5,
    borderRadius: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
