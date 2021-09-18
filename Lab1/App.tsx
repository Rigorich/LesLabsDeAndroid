import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScaledSize, StatusBar } from 'react-native';
import Colors from './components/Common/Colors';
import Calculator from './components/CalculatorParts/Calculator';


export default function App() {

  const [windowInfo, setWindowInfo] = useState(Dimensions.get("window"));

  const isLandscape = () => windowInfo.width > windowInfo.height;

  useEffect(() => {
    const onChange = ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => {
      setWindowInfo(window);
    };
    Dimensions.addEventListener('change', onChange);
    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.StatusBarColor}
        hidden={false}
      />
        <Calculator isLandscape={isLandscape} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DefaultBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
