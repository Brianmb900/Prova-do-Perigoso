import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './src/pages/home';
import Cep from './src/pages/cep';
import Cad from './src/pages/cad'
import Addresses from './src/pages/addresses';
import Ver from './src/pages/ver';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const icons = {
  Home:{
    name: 'home',
  },
  Endereços:{
    name: 'book',
  },
  Cadastrar:{
    name: 'add-circle',
  }
}

function Inicio(){
  return(
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Inicio" component={Home} />
        <Stack.Screen options={{headerShown: false}} name="Cadastro2" component={Cad} />
      </Stack.Navigator>
  );
}

function Endereços(){
  return(
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Endereços2" component={Addresses} />
        <Stack.Screen options={{headerShown: false}} name="Ver/Alterar" component={Ver} />
      </Stack.Navigator>
  );
}

export default function App(){
  return(
    <NavigationContainer>
        <Tab.Navigator screenOptions={ ({route}) => ({
        tabBarIcon: ({ color, size }) => {
          const { name } = icons[route.name];
          return <Icon name={name} color={color} size={size} />
        }
      })
      }>
          <Tab.Screen options={{headerShown: false}} name="Home" component={Inicio} />
          <Tab.Screen options={{headerShown: false}} name="Cadastrar" component={Cep} />
          <Tab.Screen options={{headerShown: false}} name="Endereços" component={Endereços} />
        </Tab.Navigator>
      </NavigationContainer>
      
  )
}