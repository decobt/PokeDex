import React from 'react';
import { Image } from 'react-native';

import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

LogBox.ignoreLogs(['Setting a timer']);

import { PokemonScreen } from './src/PokemonScreen';
import { HomeScreen } from './src/HomeScreen';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        title: 'PokeDex',
        headerStyle: {
          backgroundColor: '#e74c3c',
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
          }
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          textTransform: 'uppercase'
        },
      })}
      />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      tabBarOptions={{
        style: {
          backgroundColor: '#e74c3c',
          fontSize: '14px'
        },
        activeTintColor: '#f9f9f9',  // Color of tab when pressed
        inactiveTintColor: '#fff', // Color of tab when not pressed
        showIcon: 'true', // Shows an icon for both iOS and Android
      }}>
        <Tab.Screen 
        name="Pokemon" 
        component={HomeStackScreen} 
        options={{
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri:'https://img.icons8.com/fluent/452/pokemon.png',
                }}
              />
            );
          }
        }}/>
        <Tab.Screen name="Pokeball" component={PokemonScreen} 
        options={{
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri:'https://img.icons8.com/color/452/pokeball-2.png',
                }}
              />
            );
          }
        }}/>
        <Tab.Screen name="Potions" component={PokemonScreen} 
        options={{
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri:'https://img.icons8.com/color/452/razz-berry.png',
                }}
              />
            );
          }
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;