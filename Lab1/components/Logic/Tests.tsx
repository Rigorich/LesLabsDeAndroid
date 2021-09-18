import { ButtonType } from "../Buttons/ButtonTypes";
import CalculatorStates from "../Common/CalculatorStates";


export default function LaunchTest(
    infoRef: React.RefObject<CalculatorStates>, 
    ButtonClickHandler: (type: ButtonType, infoRef: React.RefObject<CalculatorStates>) => void
  ): void {
  return;

  [
    ButtonType.ExpressionClear,

    ButtonType.SymbolBrackets,
    ButtonType.Digit0,
    ButtonType.Digit0,
    ButtonType.Digit0,
    ButtonType.SymbolPoint,
    ButtonType.SymbolPoint,
    ButtonType.Digit0,
    ButtonType.Digit0,
    ButtonType.Digit0,
    ButtonType.SymbolBrackets,
    ButtonType.SymbolBrackets,

    ButtonType.OperatorPlus,
    ButtonType.Digit0,
    ButtonType.Digit0,
    ButtonType.Digit0,
    ButtonType.SymbolPoint,
    ButtonType.SymbolPoint,
    ButtonType.Digit0,
    ButtonType.Digit0,
    ButtonType.Digit0,

    ButtonType.OperatorPlus,
    ButtonType.SymbolBrackets,
    ButtonType.Digit0,
    ButtonType.SymbolPoint,
    ButtonType.Digit1,
    ButtonType.OperatorPlus,
    ButtonType.Digit0,
    ButtonType.SymbolPoint,
    ButtonType.Digit2,
    ButtonType.SymbolBrackets,

    ButtonType.SymbolBrackets,
  ]
  .forEach((type, index) => 
    setTimeout(() => 
      ButtonClickHandler(type, infoRef), 
        42 + index * 50));

  // (((0.000))+0.000+(0.1+0.2))
  // = 0.3
}