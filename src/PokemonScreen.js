import React, { Component } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { ScrollView, Text, View, Image, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
class PokemonData extends Component {
  render() {
    const abilities = this.props.pokemon.abilities;

    return (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>ABILITIES</Text>
      <FlatList
        data={abilities}
        keyExtractor={item => item.ability.name}
        renderItem={({ item }) => (
          <Text><Icon name="circle" size={10} color="#222" /> {item.ability.name.replace('-',' ')}</Text>
        )}>
      </FlatList>
      <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>STATS</Text>
    </View>
    );
  };
}


class PokemonAbilities extends Component {
  render() {
    const moves = this.props.pokemon.moves;

    return (
        <View>
        <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>MOVES</Text>
        <FlatList
        data={moves}
        keyExtractor={item => item.move.name}
        numColumns={3}
        renderItem={({ item }) => (
              <Text style={{width:'33%'}}>
                <Icon name="circle" size={10} color="#222" /> {item.move.name.replace('-',' ')}
              </Text>
            )}></FlatList>
        </View>
    );
  }
}

export class PokemonScreen extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
      const pokemon = this.props.route.params.pokemon;
      const background = this.props.route.params.background;
   
      return (
        <SafeAreaProvider>
          
          <View style={{ width: '100%', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, backgroundColor: background, alignItems: 'center', justifyContent: 'center', alignContent: 'stretch' }}>
          <Image
          style={{ width: 250, height: 250, alignItems: 'stretch', justifyContent: 'center'  }}
          source={{
            uri: pokemon.sprites.other['official-artwork'].front_default
          }}
          />
          </View>
          <ScrollView style={{padding: 15}}>

            <PokemonData pokemon={pokemon} />
            <FlatList
            style={{ paddingBottom: 20 }}
              data={this.props.route.params.pokemon.stats}
              keyExtractor={item => item.id + item.stat.name}
              renderItem={({ item }) => (
                <ProgressBar style={{width: '100%'}} keyExtractor={item => item.id} item={item} background={this.props.route.params.background}/>
              )}
            >
            </FlatList>
            <PokemonAbilities pokemon={pokemon} style={{ flex: 1, width: '100%', justifyContent: 'space-evenly', paddingBottom: 10 }} />
            <Text style={{height:100}}></Text>

          </ScrollView>
        </SafeAreaProvider>
        
      );
    }
  }