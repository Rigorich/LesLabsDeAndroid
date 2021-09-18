import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CalculatorStates from '../Common/CalculatorStates';
import Colors from '../Common/Colors';
import Display from './Display';
import SimpleButtonsPanel from './Panels/SimpleButtonsPanel';
import ScientificButtonsPanel from './Panels/ScientificButtonsPanel';
import { ButtonType } from '../Buttons/ButtonTypes';


export default function Calculator({isLandscape} 
  : {isLandscape: () => boolean}) {


  const [expression, setExpression] = useState<ButtonType[]>([]);
  const [memory, setMemory] = useState(0);


  const info: CalculatorStates = {
    expression,
    setExpression,
    memory,
    setMemory,
  };

  const infoRef = useRef<CalculatorStates>(info);
  
  useEffect(() => {
    infoRef.current = {
      expression,
      setExpression,
      memory,
      setMemory,
    };
  }, [expression, memory]);


  const [useScientificButtonsPanel, setUseScientificButtonsPanel] = useState(false);

  const panelsScrollView = useRef<ScrollView>(null);

  useEffect(() => {
    if (useScientificButtonsPanel) {
      panelsScrollView.current?.scrollToEnd();
    }
    else {
      panelsScrollView.current?.scrollTo();
    }
  }, [useScientificButtonsPanel]);

  useEffect(() => {
    setUseScientificButtonsPanel(false);
  }, [isLandscape()]);


  useEffect(() => {
    const _memory = memory;
    const _expression = expression;

    setMemory(memory === 0 ? 42 : 0);
    setExpression([]);

    setTimeout(() => {
      setMemory(_memory);
      setExpression(_expression);
    }, 42);

  }, [isLandscape()]);


  return (
    <View style={styles.container}>
      <Display 
        expression={expression} 
        memory={memory} 
        isLandscape={isLandscape}
        useScientificButtonsPanel={useScientificButtonsPanel} 
        setUseScientificButtonsPanel={setUseScientificButtonsPanel} 
      />
      {useMemo(() => 
      <View style={styles.ButtonsView}>
        { 
          isLandscape() ? 
          <View style={styles.PanelsView}>
            <SimpleButtonsPanel infoRef={infoRef} />
            <ScientificButtonsPanel infoRef={infoRef} />
          </View>
          :
          <ScrollView 
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            ref={panelsScrollView}
            style={styles.PanelsScrollView} 
            contentContainerStyle={styles.PanelsScrollViewElement}
          >
            <View style={styles.PanelsScrollViewInnerElement}>
              <SimpleButtonsPanel infoRef={infoRef} />
              <ScientificButtonsPanel infoRef={infoRef} />
            </View>
          </ScrollView>
        }
      </View>
      , [isLandscape()])}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ButtonsView: {
    width: "100%", 
    height: "70%", 
    backgroundColor: Colors.ButtonsViewBackgroundColor,
  },
  PanelsView: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  PanelsScrollView: {
    height: '100%',
    width: '100%',
  },
  PanelsScrollViewElement: {
    height: '100%',
    width: '200%',
  },
  PanelsScrollViewInnerElement: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
});
