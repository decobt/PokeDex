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
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      marginTop:22,
      padding: 6
    },
    subtext:{
      fontSize: 10,
      width: '100%',
      alignSelf: 'stretch'
    },
    type:{
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      padding: 5,
      margin: 5,
      borderRadius: 5
    }
  });