import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonType, GetButtonName } from '../../Buttons/ButtonTypes';
import CalculatorButton from '../../Buttons/CalculatorButton';
import CalculatorStates from '../../Common/CalculatorStates';


export default function SimpleButtonsPanel({infoRef}
  : {infoRef: React.RefObject<CalculatorStates>}) {

  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalculatorButton type={ButtonType.ExpressionClear} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.ExpressionBackspace} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.MemoryLoad} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.MemorySave} infoRef={infoRef} />
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalculatorButton type={ButtonType.Digit7} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.Digit8} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.Digit9} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.OperatorDivide} infoRef={infoRef} />
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalculatorButton type={ButtonType.Digit4} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.Digit5} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.Digit6} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.OperatorMultiply} infoRef={infoRef} />
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalculatorButton type={ButtonType.Digit1} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.Digit2} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.Digit3} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.OperatorMinus} infoRef={infoRef} />
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalculatorButton type={ButtonType.SymbolBrackets} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.Digit0} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.SymbolPoint} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.OperatorPlus} infoRef={infoRef} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
