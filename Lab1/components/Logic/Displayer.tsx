
import { ButtonType, GetButtonName } from '../Buttons/ButtonTypes';
import { TryAddBracketsToExpression } from './Evaluator';


export default function BuildUserExpression(sequence: ButtonType[]): string {

  let result = "";

  for (let index = 0; index < sequence.length; index++) {
    const type = sequence[index];
    switch (type) {

      case ButtonType.SymbolBrackets: 
        result = TryAddBracketsToExpression(result, sequence.slice(0, index));
        break;
      
      case ButtonType.Digit0:
      case ButtonType.Digit1:
      case ButtonType.Digit2:
      case ButtonType.Digit3:
      case ButtonType.Digit4:
      case ButtonType.Digit5:
      case ButtonType.Digit6:
      case ButtonType.Digit7:
      case ButtonType.Digit8:
      case ButtonType.Digit9:
      case ButtonType.SymbolPoint:
      case ButtonType.ConstPi:
      case ButtonType.ConstE:
      case ButtonType.OperatorPlus:
      case ButtonType.OperatorMinus:
      case ButtonType.OperatorMultiply:
      case ButtonType.OperatorDivide:
        result = result + GetButtonName(type);
        break;

      case ButtonType.FunctionSin:
      case ButtonType.FunctionArcSin:
      case ButtonType.FunctionCos:
      case ButtonType.FunctionArcCos:
      case ButtonType.FunctionTg:
      case ButtonType.FunctionArcTg:
      case ButtonType.FunctionCtg:
      case ButtonType.FunctionArcCtg:
      case ButtonType.FunctionLog2:
      case ButtonType.FunctionLogE:
      case ButtonType.FunctionLog10:
        result = result + GetButtonName(type) + '(';
        break;
  
      case ButtonType.OperatorPow: 
        result = result + '^';
        break;

      case ButtonType.OperatorMod: 
        result = result + ' mod ';
        break;

      case ButtonType.FunctionSqrt: 
        result = result + '√(';
        break;

      case ButtonType.FunctionFact: 
        result = result + 'fact(';
        break;
      
      case ButtonType.MemoryLoad:
        result = result + 'M'
        break;

      default: throw "Unknown button type";
    }
  }

  return result;
}
