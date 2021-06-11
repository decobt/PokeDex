import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//LogBox.ignoreLogs(['Setting a timer']);

var Pokedex = require('pokedex-promise-v2');
var options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
var P = new Pokedex(options);

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

export class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: '',
        sprites: []
      },
      isLoading: true
    };

    //this.onPressButton = this.onPressButton.bind(this);
  }

  componentDidMount = () => {
    P.getPokemonByName( this.props.item.name )
    .then(function(response) {
      this.setState({ data: response });
    }.bind(this));
  }

  render() {
    const { data, isLoading } = this.state;
    const sprites = data.sprites;
    const navigation = this.props.navigation;
    
    return (
      <TouchableHighlight onPress={() => navigation.navigate('Pokemon')} underlayColor="white">
      <View 
        style={styles.card}
        >
        <Image style={styles.image} source={{ uri: data.sprites.front_default }} /> 
        <Text style={styles.text}>{data.name}<Text style={styles.subtext}>#{data.id}</Text></Text>
      </View>
      </TouchableHighlight>
    );
  }
};

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      offset: 0
    };
  }

  getPokemonList = () => {
    const { data, isLoading, offset } = this.state;
    this.setState({ isLoading: true });

    P.getPokemonsList({limit: 20 * (offset + 1), offset: 0})
    .then(function(response) {
      this.setState({ data: response.results, offset: offset+1, isLoading: false });
    }.bind(this));
  }
  componentDidMount = () => {
    this.getPokemonList();
  }

  render() {
    const { data, isLoading, offset } = this.state;
    return (
      <SafeAreaProvider>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <Item 
              item={item}
              style={styles.cardWrapper}
              navigation = {this.props.navigation}
             />
          )}
          onEndReached={() => {
            this.getPokemonList();
          }}
          onEndReachedThreshold={0.01}
          refreshing={isLoading}
          numColumns={1}
          style={styles.container}
          />
      </View>
      </SafeAreaProvider>
    );
  }
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pokemon" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'lightblue'
  },
  container: {
    backgroundColor: 'white',
    padding: 5
  },
  cardWrapper: {
    padding: 10
  },
  card: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    minHeight: 80,
    height: 80,
    width: 80,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'uppercase',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop:30
  },
  subtext:{
    fontSize: 10,
    width: '100%',
    alignSelf: 'stretch'
  }
});
