import { TouchableHighlight, Text, View, Image } from 'react-native';
import React, { Component } from 'react';

import { P } from './../../assets/api';
import { styles } from '../../assets/styles';
import { colours } from '../../assets/colors';

export class PokemonCard extends Component {
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