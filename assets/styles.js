import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
      backgroundColor: 'lightblue'
    },
    container: {
      backgroundColor: 'white',
      padding: 5,
    },
    cardWrapper: {
      padding: 10
    },
    card: {
      borderRadius: 5,
      padding: 10,
      margin: 10,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'relative',
      overflow: 'hidden'
    },
    image: {
      minHeight: 80,
      height: 80,
      width: 80,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      width: '100%',
      marginTop:14
    },
    subtext:{
      fontSize: 14,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      color: '#fff',
      paddingTop: 4,
      paddingBottom: 6,
      paddingLeft: 10,
      paddingRight: 10
    },
    circle:{
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      width: 200,
      height: 200,
      position: 'absolute',
      right: -50,
      top: -50,
      borderRadius: 100
    },
    input: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10
    },
    imgLarge: {
      position: 'absolute',
      height: 105,
      width: 105,
      right: 40,
      bottom: 15
    }
  });