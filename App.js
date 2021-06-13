//import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

LogBox.ignoreLogs(['Setting a timer']);

var Pokedex = require('pokedex-promise-v2');
var options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
var P = new Pokedex(options);

function ProgressBar({item, background}){
  console.log(item);
  return (
    <View style={{ padding: 5, flexDirection: 'row' }}>
      <View style={{ width: '100%' }}>
          <Text style={{color: 'black', width: '100%'}}>{item.stat.name}</Text>
          <View 
            style={{
              height: 20,
              backgroundColor: "#e0e0de",
              width: '100%',
              borderRadius: 50
            }}
            >
            <View
            style={{
              height: 20,
              width: item.base_stat <= 100 ? item.base_stat + '%' : '100%',
              backgroundColor: background,
              borderRadius: 50,
              alignItems: 'center'
            }}
            >
              <Text>{item.base_stat}%</Text>
            </View>
            </View>
          </View>
        </View>
  )
}

class PokemonScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statsObj: ''
    }
  }

  componentDidMount = () => {
    let pokemon = this.props.route.params.pokemon.stats;
    let background = this.props.route.params.background;
    let statsObj = pokemon.map(function(item){
      return (
        <ProgressBar keyExtractor={item => item.id} item={item} background={background}/>
      );
    });
    this.setState({ statsObj: statsObj });
  }

  render() {
    const { statsObj } = this.state;
    const pokemon = this.props.route.params.pokemon;
    const background = this.props.route.params.background;
 
    return (
      <View>
        <View style={{ width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: background, alignItems: 'center', justifyContent: 'center', alignContent: 'stretch' }}>
        <Image
        style={{ width: 250, height: 250, alignItems: 'stretch', justifyContent: 'center'  }}
        source={{
          uri: pokemon.sprites.other['official-artwork'].front_default
        }}
        />
        </View>
        <ScrollView style={{ padding: 15 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>STATS</Text>
        <Text>{statsObj}</Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>ABILITIES</Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>SPRITES</Text>
        </ScrollView>
      </View>
      
    );
  }
}

export class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: '',
        sprites: []
      },
      isLoading: true,
      type: '',
      typeObj: ''
    };

    //this.onPressButton = this.onPressButton.bind(this);
  }

  componentDidMount = () => {
    P.getPokemonByName( this.props.item.name )
    .then(function(response) {
      this.setState({ data: response });
      let type = response.types.map(function(t){
        return t.type.name;
      });
      let typeObj = response.types.map(function(t){
        return (
          <Text keyExtractor={t => t.id} style={[ { flex: 1, borderRadius: 10, backgroundColor: 'rgba(255,255,255, 0.25)', padding: 20, flexDirection: 'row', alignItems: 'stretch' }]}>{t.type.name}</Text>
        );
      });
      this.setState({ type: type, typeObj: typeObj });
    }.bind(this));
  }

  render() {
    const { data, type, typeObj } = this.state;
    const sprites = data.sprites;
    const navigation = this.props.navigation;

    const colours = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };
    
    return (
      <TouchableHighlight onPress={() => navigation.navigate('Pokemon', { title: data.name, background: colours[type[0]], pokemon: data })} underlayColor="white">
      <View 
        style={[{ backgroundColor: colours[type[0]] }, styles.card]}
        >
        <Image style={styles.image} source={{ uri: data.sprites.front_default }} /> 
        <Text style={styles.text}>{data.name}</Text>
        <Text style={{ flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'column'}}>{typeObj}</Text>
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'lightblue'
  },
  container: {
    backgroundColor: 'white',
    padding: 5,
  },
  cardWrapper: {
    padding: 10
  },
  card: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    minHeight: 80,
    height: 80,
    width: 80,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop:22,
    padding: 6
  },
  subtext:{
    fontSize: 10,
    width: '100%',
    alignSelf: 'stretch'
  },
  type:{
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    padding: 5,
    margin: 5,
    borderRadius: 5
  }
});
