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
            <View key={t.id + t.type.name} style={{ paddingRight: 5, paddingBottom:5, paddingTop:5 }}>
              <View style={[styles.subtext, {borderRadius: 6 }]}>
                <Text>{t.type.name}</Text>
              </View>
            </View>
          );
        });
        this.setState({ type: type, typeObj: typeObj });
      }.bind(this));
    }
  
    render() {
      const { data, type, typeObj } = this.state;
      const navigation = this.props.navigation;
      let url = '';
      if(data.sprites.other != undefined){
        url = data.sprites.other['official-artwork'].front_default;
      }else{
        url = data.sprites.front_default;
      }
 
      return (
        <TouchableHighlight onPress={() => navigation.navigate('Pokemon', { title: data.name, background: colours[type[0]], pokemon: data })} underlayColor="white">
        <View>
          <View style={[{ backgroundColor: colours[type[0]] }, styles.card]} >
            <View style={{width: '100%', paddingLeft: 20}}>
              <Text style={styles.text}>{data.name}</Text>
              <Text>{typeObj}</Text>
            </View>
            <View style={styles.circle}></View>
          </View>
        
          <Image style={[styles.image, styles.imgLarge]} source={{ uri: url }} /> 
          </View>
        </TouchableHighlight>
      );
    }
  };