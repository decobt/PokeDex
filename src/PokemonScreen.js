import React, { Component } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { ScrollView, Text, View, Image, FlatList } from 'react-native';

function PokemonData(){
  return (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>ABOUT</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>STATS</Text>
    </View>
  );
}

function PokemonAbilities(){
  return (
    <View>
    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>ABILITIES</Text>
    <View style={{height: 600, width: '100%', backgroundColor: 'black'}}></View>
    </View>
  );
}

export class PokemonScreen extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        statsObj: ''
      }
    }
  

  
    render() {
      const { statsObj } = this.state;
      const pokemon = this.props.route.params.pokemon;
      const background = this.props.route.params.background;
   
      return (
        <View>
          <View style={{ width: '100%', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, backgroundColor: background, alignItems: 'center', justifyContent: 'center', alignContent: 'stretch' }}>
          <Image
          style={{ width: 250, height: 250, alignItems: 'stretch', justifyContent: 'center'  }}
          source={{
            uri: pokemon.sprites.other['official-artwork'].front_default
          }}
          />
          </View>
          <View style={{ padding: 15 }}>
          
          <FlatList
            data={this.props.route.params.pokemon.stats}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ProgressBar style={{width: '100%'}} keyExtractor={item => item.id} item={item} background={this.props.route.params.background}/>
            )}
            ListHeaderComponent={PokemonData} 
            ListFooterComponent={PokemonAbilities} 
          >
          </FlatList>
          </View>

        </View>
        
      );
    }
  }