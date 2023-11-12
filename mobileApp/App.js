import React from "react";
import { AppRegistry} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from "expo";
import StackNavigator from "./navigator/StackNavigator";
import {CartProvider} from "./components/ContextReducer"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
export default function App() {
  return (
    <CartProvider>
        <StatusBar style="auto" backgroundColor="green" color="white" />
        <StackNavigator />
    </CartProvider>
  );
}
registerRootComponent(App);

