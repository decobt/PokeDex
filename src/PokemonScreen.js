import React, { Component } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { ScrollView, Text, View, Image } from 'react-native';

export class PokemonScreen extends Component {
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