import React, { Component } from 'react';
import { Text, View } from 'react-native';

export function ProgressBar({item, background}){
    //console.log(item);
    return (
      <View style={{ width: '100%' }}>
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