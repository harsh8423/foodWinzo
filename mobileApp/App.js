import { StatusBar } from 'expo-status-bar';
import React from "react";
import { registerRootComponent } from "expo";
import StackNavigator from "./navigator/StackNavigator";
import {CartProvider} from "./components/ContextReducer"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  return (
    <>
        <StatusBar style={{color:"green"}}/>
        <StackNavigator />
    </>
  );
}
registerRootComponent(App);

