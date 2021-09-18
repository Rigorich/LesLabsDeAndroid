import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { ButtonType } from '../Buttons/ButtonTypes';
import Colors from '../Common/Colors';
import { BeautifyNumber, Evaluate } from '../Logic/Evaluator'; 
import BuildUserExpression from '../Logic/Displayer';

export default function Display({expression, memory, isLandscape, useScientificButtonsPanel, setUseScientificButtonsPanel} : {
    expression: ButtonType[], 
    memory: number, 
    isLandscape: () => boolean, 
    useScientificButtonsPanel: boolean, 
    setUseScientificButtonsPanel: (state: boolean) => void
  }) {


  const result = Evaluate(expression, memory);

  const expressionScrollView = useRef<ScrollView>(null);

  useEffect(() => {
    expressionScrollView.current?.scrollToEnd();
  }, [expression])

  return (
    <View style={styles.container}>
      <View style={styles.topRowView}>
        <Text style={styles.memory} adjustsFontSizeToFit numberOfLines={1}>
          {`M ${BeautifyNumber(memory)}`}
        </Text>
        {isLandscape() ||
        <Switch 
          style={styles.switcher}
          value={useScientificButtonsPanel}
          onValueChange={setUseScientificButtonsPanel} 
          thumbColor={useScientificButtonsPanel ? Colors.SwitchEnabledThumbColor : Colors.SwitchDisabledThumbColor}
          trackColor={{true: Colors.SwitchEnabledTrackColor, false: Colors.SwitchDisabledTrackColor}}
        />
        }
      </View>
      <ScrollView 
        style={styles.outerExpressionScrollView}
        horizontal
        ref={expressionScrollView}
        onContentSizeChange={() => expressionScrollView.current?.scrollToEnd()}
        contentContainerStyle={styles.innerExpressionScrollView}
      >
        <Text style={styles.expression}>{BuildUserExpression(expression)}</Text>
      </ScrollView>
      <Text 
        adjustsFontSizeToFit
        numberOfLines={1}
        style={styles.result}
      >
        {result}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.DisplayBackgroundColor,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },

  topRowView: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingTop: 5,
  },
  memory: {
    fontSize: 20,
    color: Colors.MemoryTextColor,
  },
  switcher: {
    marginRight: 5,
  },

  outerExpressionScrollView: {
    flex: 0.5,
    minWidth: '100%',
  },
  innerExpressionScrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  expression: {
    fontSize: 30,
    color: Colors.ExpressionTextColor,
    marginLeft: 10,
    marginRight: 10,
  },

  result: {
    flex: 1,
    fontSize: 30,
    color: Colors.ResultTextColor,
    marginLeft: 5,
    marginRight: 10,
  },
  
});
