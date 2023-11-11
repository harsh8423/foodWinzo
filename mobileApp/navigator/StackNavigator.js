import Home from "../screens/Home";
import Cart from "../screens/Cart";
import MyOrder from "../screens/MyOrder";
import Signup from "../screens/Signup";
import Login from "../screens/Login";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign, Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = route.name;
        const isFocused = state.index === index;

        var icon;
        if (route.name === "Home") {
          icon = isFocused ? (
            <Entypo name="home" size={24} color="green" />
          ) : (
            <AntDesign name="home" size={24} color="black" />
          );
        } else if (route.name === "Cart") {
          icon = isFocused ? (
            <MaterialIcons name="message" size={24} color="green" />
          ) : (
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color="black"
            />
          );
        } else if (route.name === "MyOrder") {
          icon = isFocused ? (
            <Ionicons name="ios-people-sharp" size={24} color="green" />
          ) : (
            <Ionicons name="ios-people-outline" size={24} color="black" />
          );
        }
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            onPress={onPress}
            style={[styles.tabBarButton, { height: 60 }]}
          >
            {icon}
            <Text style={styles.tabBarLabel}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTab() {
    return (
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="MyOrder" component={MyOrder} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Tab.Screen name="Main" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    color: "green",
    height: 80,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderColor: "green",
    borderWidth: 2,
  },
  tabBarButton: {
    flex: 1,
    color: "green",
    alignItems: "center",
  },
  tabBarLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 
});

export default StackNavigator;
