import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonType } from '../../Buttons/ButtonTypes';
import CalculatorButton from '../../Buttons/CalculatorButton';
import CalculatorStates from '../../Common/CalculatorStates';

export default function ScientificButtonsPanel({infoRef}
  : {infoRef: React.RefObject<CalculatorStates>}) {

  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalculatorButton type={ButtonType.FunctionSin} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.FunctionArcSin} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.ConstPi} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.ConstE} infoRef={infoRef} />
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalculatorButton type={ButtonType.FunctionCos} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.FunctionArcCos} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.FunctionSqrt} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.OperatorPow} infoRef={infoRef} />
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalculatorButton type={ButtonType.FunctionTg} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.FunctionArcTg} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.FunctionLogE} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.FunctionLog10} infoRef={infoRef} />
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <CalculatorButton type={ButtonType.OperatorMod} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.FunctionFact} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.FunctionLog2} infoRef={infoRef} />
        <CalculatorButton type={ButtonType.Copyright} infoRef={infoRef} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
