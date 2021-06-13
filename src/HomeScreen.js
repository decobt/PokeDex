import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PokemonCard } from './components/PokemonCard';
import { View, FlatList } from 'react-native';
import React, { Component } from 'react';

import { P } from './../assets/api';
import { styles } from '../assets/styles';

export class HomeScreen extends Component {
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
              <PokemonCard 
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
