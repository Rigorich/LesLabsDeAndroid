import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import CalculatorStates from '../Common/CalculatorStates';
import Colors from '../Common/Colors';
import ButtonClickHandler from '../Logic/Buttons';
import { ButtonType, GetButtonName } from './ButtonTypes';


export default function CalculatorButton({type, infoRef} 
  : {type: ButtonType, infoRef: React.RefObject<CalculatorStates>}) {
  
  return (
    <View
      style={styles.View}
    >
      <TouchableHighlight 
        style={styles.TouchableOpacity}
        activeOpacity={1}
        underlayColor={Colors.ButtonBackgroundColorOnPress}
        onPress={() => ButtonClickHandler(type, infoRef)}
      >
        <Text style={styles.Text} adjustsFontSizeToFit numberOfLines={1}>
          {GetButtonName(type)}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  TouchableOpacity: {
    height: '100%', 
    width: '100%', 
    backgroundColor: Colors.ButtonBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.ButtonBorderColor,
  },
  Text: {
    padding: 5,
    fontSize: 30,
  }
});
