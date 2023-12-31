import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';

export default function Signup({ navigation }) {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', geolocation: '' });
  const [address, setAddress] = useState('');


  const handleSubmit = async () => {
    try {
      const response = await fetch('https://foodwinzo.vercel.app/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // save the auth token to async storage and navigate
        // assuming you're using AsyncStorage for storing data

        await AsyncStorage.setItem('token', json.authToken);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Enter Valid Credentials');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onChange = (name, value) => {
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={credentials.name}
              onChangeText={(text) => onChange('name', text)}
              placeholder="Enter your name"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              value={credentials.email}
              onChangeText={(text) => onChange('email', text)}
              placeholder="Enter your email"
            />
          </View>
          <View style={styles.formGroup}>
            <TouchableOpacity style={styles.button} onPress={handleClick} name="geolocation">
              <Text style={styles.buttonText}>Click for current Location</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={credentials.password}
              onChangeText={(text) => onChange('password', text)}
              secureTextEntry
              placeholder="Enter your password"
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: 'red' }]} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.submitButtonText}>Already a user</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 900,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  form: {
    width: 280,
    marginTop: 50,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
