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
            <View keyExtractor={t => t.id} style={{ paddingRight: 5, paddingBottom:5, paddingTop:5 }}><View style={[styles.subtext, {borderRadius: 6, padding: 5}]}><Text>{t.type.name}</Text></View></View>
          );
        });
        this.setState({ type: type, typeObj: typeObj });
      }.bind(this));
    }
  
    render() {
      const { data, type, typeObj } = this.state;
      const navigation = this.props.navigation;

      return (
        <TouchableHighlight onPress={() => navigation.navigate('Pokemon', { title: data.name, background: colours[type[0]], pokemon: data })} underlayColor="white">
        <View style={[{ backgroundColor: colours[type[0]] }, styles.card]} >
          <View style={{width: '70%', paddingLeft: 20}}>
            <Text style={styles.text}>{data.name}</Text>
            <Text>{typeObj}</Text>
          </View>
          <View style={{width: '30%'}}>
            <Image style={styles.image} source={{ uri: data.sprites.front_default }} /> 
          </View>
          <View style={styles.circle}></View>
        </View>
        </TouchableHighlight>
      );
    }
  };