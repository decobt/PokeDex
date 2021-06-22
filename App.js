import React from 'react';

import { LogBox, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

LogBox.ignoreLogs(['Setting a timer']);

import { PokemonScreen } from './src/PokemonScreen';
import { HomeScreen } from './src/HomeScreen';

const HomeStack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        title: 'PokeDex',
        headerRight: () => (
          <TouchableOpacity
          onPress={() => alert('This is a button!')}
          activeOpacity={0.5}>
            <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={{
              uri:'https://img.icons8.com/color/452/pokeball-2.png',
            }}
          />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: '#e74c3c',
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
              height: 0,
          },
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
       />
      <HomeStack.Screen 
      name="Pokemon" 
      component={PokemonScreen}
      options={({ route }) => ({
        title: route.params.title,
        headerStyle: {
          backgroundColor: route.params.background,
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
              height: 0,
          },
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          textTransform: 'uppercase'
        },
      })}
      />
    </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;