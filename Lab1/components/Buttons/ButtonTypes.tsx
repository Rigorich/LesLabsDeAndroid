const enum ButtonType {
  Copyright = 42,

  Digit0,
  Digit1,
  Digit2,
  Digit3,
  Digit4,
  Digit5,
  Digit6,
  Digit7,
  Digit8,
  Digit9,
  SymbolPoint,
  SymbolBrackets,
  OperatorPlus,
  OperatorMinus,
  OperatorMultiply,
  OperatorDivide,
  ExpressionClear,
  ExpressionBackspace,
  MemoryLoad,
  MemorySave,

  ConstPi,
  ConstE,
  OperatorPow,
  OperatorMod,
  FunctionSin,
  FunctionArcSin,
  FunctionCos,
  FunctionArcCos,
  FunctionTg,
  FunctionArcTg,
  FunctionCtg,
  FunctionArcCtg,
  FunctionSqrt,
  FunctionLog2,
  FunctionLogE,
  FunctionLog10,
  FunctionFact,
}

const enum ExpressionOperationType {
  Copyright = 42,
  
  DigitZero,
  DigitNonZero,
  SymbolPoint,
  SymbolBrackets,
  MathOperation,
  MathFunction,
  SymbolConst,
}

function GetButtonTypeByDigit(digit: number | string): ButtonType | null {
  switch (digit) {
    case '0':
    case 0: return ButtonType.Digit0;
    case '1':
    case 1: return ButtonType.Digit1;
    case '2':
    case 2: return ButtonType.Digit2;
    case '3':
    case 3: return ButtonType.Digit3;
    case '4':
    case 4: return ButtonType.Digit4;
    case '5':
    case 5: return ButtonType.Digit5;
    case '6':
    case 6: return ButtonType.Digit6;
    case '7':
    case 7: return ButtonType.Digit7;
    case '8':
    case 8: return ButtonType.Digit8;
    case '9':
    case 9: return ButtonType.Digit9;
    default: return null;
  }
}

function GetButtonName(type: ButtonType): string {
  switch (type) {
    case ButtonType.Digit0: return '0';
    case ButtonType.Digit1: return '1';
    case ButtonType.Digit2: return '2';
    case ButtonType.Digit3: return '3';
    case ButtonType.Digit4: return '4';
    case ButtonType.Digit5: return '5';
    case ButtonType.Digit6: return '6';
    case ButtonType.Digit7: return '7';
    case ButtonType.Digit8: return '8';
    case ButtonType.Digit9: return '9';
    case ButtonType.SymbolPoint: return '.';
    case ButtonType.SymbolBrackets: return '( )';
    case ButtonType.OperatorPlus: return '+';
    case ButtonType.OperatorMinus: return '-';
    case ButtonType.OperatorMultiply: return '*';
    case ButtonType.OperatorDivide: return '/';
    case ButtonType.ExpressionClear: return 'C';
    case ButtonType.ExpressionBackspace: return '←';
    case ButtonType.MemoryLoad: return 'ML';
    case ButtonType.MemorySave: return 'MS';

    case ButtonType.ConstPi: return 'π';
    case ButtonType.ConstE: return 'e';
    case ButtonType.OperatorPow: return 'x^y';
    case ButtonType.OperatorMod: return 'mod';
    case ButtonType.FunctionSin: return 'sin';
    case ButtonType.FunctionArcSin: return 'arcsin';
    case ButtonType.FunctionCos: return 'cos';
    case ButtonType.FunctionArcCos: return 'arccos';
    case ButtonType.FunctionTg: return 'tg';
    case ButtonType.FunctionArcTg: return 'arctg';
    case ButtonType.FunctionCtg: return 'ctg';
    case ButtonType.FunctionArcCtg: return 'arcctg';
    case ButtonType.FunctionSqrt: return '√';
    case ButtonType.FunctionLog2: return 'log2';
    case ButtonType.FunctionLogE: return 'ln';
    case ButtonType.FunctionLog10: return 'log10';
    case ButtonType.FunctionFact: return 'n!';

    case ButtonType.Copyright: return '© Rigorich';
  }
  throw "Unknown button type";
}

function GetButtonExpressionOperationType(type: ButtonType): ExpressionOperationType {
  switch (type) {
    case ButtonType.Digit0: return ExpressionOperationType.DigitZero;

    case ButtonType.Digit1:
    case ButtonType.Digit2:
    case ButtonType.Digit3:
    case ButtonType.Digit4:
    case ButtonType.Digit5:
    case ButtonType.Digit6:
    case ButtonType.Digit7:
    case ButtonType.Digit8:
    case ButtonType.Digit9:
      return ExpressionOperationType.DigitNonZero;
    
    case ButtonType.SymbolPoint:
        return ExpressionOperationType.SymbolPoint;

    case ButtonType.SymbolBrackets: 
      return ExpressionOperationType.SymbolBrackets;

    case ButtonType.OperatorPlus:
    case ButtonType.OperatorMinus:
    case ButtonType.OperatorMultiply:
    case ButtonType.OperatorDivide:
    case ButtonType.OperatorPow:
    case ButtonType.OperatorMod: 
      return ExpressionOperationType.MathOperation;

    case ButtonType.ConstPi:
    case ButtonType.ConstE:
    case ButtonType.MemoryLoad: 
      return ExpressionOperationType.SymbolConst;
    
    case ButtonType.FunctionSin:
    case ButtonType.FunctionArcSin:
    case ButtonType.FunctionCos:
    case ButtonType.FunctionArcCos:
    case ButtonType.FunctionTg:
    case ButtonType.FunctionArcTg:
    case ButtonType.FunctionCtg:
    case ButtonType.FunctionArcCtg:
    case ButtonType.FunctionSqrt:
    case ButtonType.FunctionLog2:
    case ButtonType.FunctionLogE:
    case ButtonType.FunctionLog10:
    case ButtonType.FunctionFact: 
      return ExpressionOperationType.MathFunction;

    case ButtonType.ExpressionClear:
    case ButtonType.ExpressionBackspace:
    case ButtonType.MemorySave: 
      throw "This button has direct effect on expression";
  }
  throw "Unknown button type";
}

export { ButtonType, ExpressionOperationType, GetButtonName, GetButtonExpressionOperationType, GetButtonTypeByDigit }