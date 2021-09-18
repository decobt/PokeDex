import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class AboutScreen extends Component {
    render() {
        return (
            <View style={{padding:20}}>
                <Text style={{fontSize:20, marginBottom:20}}>The Pokedex app</Text>
                <Text style={{lineHeight:30, marginBottom:20}}>The Pokedex app keeps track of all the Pokemon that have appeared in any Pokemon series. Use the Pokedex app to learn more about the different species of Pokémon and their Evolutions.</Text>
                <Text style={{lineHeight:30, marginBottom:20}}>The Pokedex app takes all pokemon information from the pokeapi v2.</Text>
            </View>
        );
    }
}