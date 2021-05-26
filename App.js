import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { SafeAreaProvider } from 'react-native-safe-area-context';

var Pokedex = require('pokedex-promise-v2');
var options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
var P = new Pokedex(options);

const Card = ({ data }) => (
  <View 
    style={styles.card}
    >
    <Image style={styles.image} source={{ uri: data.sprites.front_default }} /> 
    <Text style={styles.text}>{data.name}<Text style={styles.subtext}>#{data.id}</Text></Text>
  </View>
);

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
    //console.log(sprites);
    return (
      <Card 
      data={data}
      Component={TouchableScale}
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.95} //
       />
    );
  }
};



export default class App extends Component {
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
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'PokeDex', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          style={styles.header}
        />
        <FlatList
          data={data}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <Item 
              item={item}
              style={styles.cardWrapper}
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
