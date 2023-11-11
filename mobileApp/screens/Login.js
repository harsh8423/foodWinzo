import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {

        await AsyncStorage.setItem('userEmail', credentials.email);
        await AsyncStorage.setItem('token', json.authToken);

        // Navigate to the home screen
        navigation.navigate('Main');
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
      source={{ uri: 'https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              value={credentials.email}
              onChangeText={(text) => onChange('email', text)}
              placeholder="Enter your email"
            />
            <Text style={styles.formText}>We'll never share your email with anyone.</Text>
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
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: 'red' }]}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.submitButtonText}>New User</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:"center"
  },
  form: {
    width: '80%',
    margin: 'auto',
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
  formText: {
    color: 'white',
    fontSize: 12,
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
