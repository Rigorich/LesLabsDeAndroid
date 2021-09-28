import { ButtonType, ExpressionOperationType, GetButtonExpressionOperationType, GetButtonTypeByDigit } from "../Buttons/ButtonTypes";
import CalculatorStates from "../Common/CalculatorStates";
import BuildUserExpression from "./Displayer";
import { Evaluate } from "./Evaluator";
import LaunchTest from "./Tests";


function TryAddButtonType(type: ButtonType, sequence: ButtonType[]): ButtonType[] {
  const result = sequence.concat(type);
  const resultButWithMultiplyOperator = sequence.concat(ButtonType.OperatorMultiply).concat(type);
  const resultButWithReplacedLast = sequence.slice(0, -1).concat(type);

  const expressionType = GetButtonExpressionOperationType(type);

  let index = sequence.length - 1;
  const lastButtonType = index >= 0 ? sequence[index] : null;

  while (
    index >= 0 && 
    (GetButtonExpressionOperationType(sequence[index]) === ExpressionOperationType.DigitZero ||
    GetButtonExpressionOperationType(sequence[index]) === ExpressionOperationType.DigitNonZero)
    )
    index--;
  
  const lastNonDigitButtonType = index >= 0 ? sequence[index] : null;

  if (lastButtonType === null) {
    switch (expressionType) {
      case ExpressionOperationType.DigitZero:
      case ExpressionOperationType.DigitNonZero:
      case ExpressionOperationType.SymbolConst:
      case ExpressionOperationType.MathFunction:
      case ExpressionOperationType.SymbolBrackets:
        return result;
      case ExpressionOperationType.SymbolPoint:
      case ExpressionOperationType.MathOperation:
        return type == ButtonType.OperatorMinus ? result : sequence;
    }
    throw "unknown ExpressionOperationType"
  }

  const expression = BuildUserExpression(sequence);
  index = expression.length - 1;
  const lastSymbol = expression[index];
  while (index >= 0 && expression[index] === '0')
    index--;
  const lastNonZeroSymbol = index >= 0 ? expression[index] : null;

  const lastExpressionType = GetButtonExpressionOperationType(lastButtonType);
  
  switch (GetButtonExpressionOperationType(type)) {

    case ExpressionOperationType.DigitZero: {
      switch (lastExpressionType) {
        case ExpressionOperationType.DigitNonZero:
        case ExpressionOperationType.MathOperation:
        case ExpressionOperationType.MathFunction:
        case ExpressionOperationType.SymbolPoint:
          return result;
        case ExpressionOperationType.SymbolBrackets:
          return lastSymbol === '(' ? result : sequence;
        case ExpressionOperationType.DigitZero:
          return (
            lastNonZeroSymbol === null ? sequence : (
            lastNonDigitButtonType === ButtonType.SymbolPoint ? result : (
            GetButtonTypeByDigit(lastNonZeroSymbol) === null ? sequence : (
              result
            ))));
        case ExpressionOperationType.SymbolConst:
          return resultButWithMultiplyOperator;
      }
    }

    case ExpressionOperationType.DigitNonZero: {
      switch (lastExpressionType) {
        case ExpressionOperationType.DigitNonZero:
        case ExpressionOperationType.SymbolPoint:
        case ExpressionOperationType.MathOperation:
        case ExpressionOperationType.MathFunction:
          return result;
        case ExpressionOperationType.SymbolBrackets:
          return lastSymbol === '(' ? result : sequence;
        case ExpressionOperationType.DigitZero:
          return (
            lastNonZeroSymbol === null ? sequence : (
            lastNonZeroSymbol === '.' ? result : (
            GetButtonTypeByDigit(lastNonZeroSymbol) === null ? sequence : (
              result
          ))));
        case ExpressionOperationType.SymbolConst:
          return resultButWithMultiplyOperator;
      }
    }

    case ExpressionOperationType.SymbolPoint: {
      switch (lastExpressionType) {
        case ExpressionOperationType.DigitZero:
        case ExpressionOperationType.DigitNonZero:
        case ExpressionOperationType.SymbolPoint:
          return lastNonDigitButtonType === ButtonType.SymbolPoint ? sequence : result;
        case ExpressionOperationType.MathOperation:
        case ExpressionOperationType.SymbolBrackets:
        case ExpressionOperationType.MathFunction:
        case ExpressionOperationType.SymbolConst:
          return sequence;
      }
    }

    case ExpressionOperationType.SymbolBrackets: {
      switch (lastExpressionType) {
        case ExpressionOperationType.DigitZero:
        case ExpressionOperationType.DigitNonZero:
        case ExpressionOperationType.MathOperation:
        case ExpressionOperationType.SymbolBrackets:
        case ExpressionOperationType.MathFunction:
        case ExpressionOperationType.SymbolConst:
          return BuildUserExpression(sequence) === BuildUserExpression(result) ? sequence : result;
        case ExpressionOperationType.SymbolPoint:
          return sequence;
      }
    }

    case ExpressionOperationType.MathOperation: {
      switch (lastExpressionType) {
        case ExpressionOperationType.DigitZero:
        case ExpressionOperationType.DigitNonZero:
        case ExpressionOperationType.SymbolConst:
          return result;
        case ExpressionOperationType.SymbolBrackets:
          return (
            lastSymbol === ')' ? result : (
            type == ButtonType.OperatorMinus ? result : (
              sequence)));
        case ExpressionOperationType.MathFunction:
          return type == ButtonType.OperatorMinus ? result : sequence;
        case ExpressionOperationType.MathOperation:
        case ExpressionOperationType.SymbolPoint:
          return resultButWithReplacedLast;
      }
    }

    case ExpressionOperationType.MathFunction: {
      switch (lastExpressionType) {
        case ExpressionOperationType.MathOperation:
        case ExpressionOperationType.MathFunction:
          return result;
        case ExpressionOperationType.SymbolBrackets:
          return lastSymbol === '(' ? result : sequence;
        case ExpressionOperationType.DigitZero:
        case ExpressionOperationType.DigitNonZero:
        case ExpressionOperationType.SymbolConst:
          return resultButWithMultiplyOperator;
        case ExpressionOperationType.SymbolPoint:
          return resultButWithReplacedLast;
      }
    }

    case ExpressionOperationType.SymbolConst: {
      switch (lastExpressionType) {
        case ExpressionOperationType.MathOperation:
        case ExpressionOperationType.MathFunction:
          return result;
        case ExpressionOperationType.SymbolBrackets:
          return lastSymbol === '(' ? result : sequence;
        case ExpressionOperationType.SymbolConst:
        case ExpressionOperationType.DigitZero:
        case ExpressionOperationType.DigitNonZero:
          return resultButWithMultiplyOperator;
        case ExpressionOperationType.SymbolPoint:
          return resultButWithReplacedLast;
      }
    }
  }

  throw "seems like someone has missed something";
}


export default function ButtonClickHandler(type: ButtonType, infoRef: React.RefObject<CalculatorStates>): void {
  const info = infoRef.current;
  if (!info) return;

  switch (type) {
    case ButtonType.Copyright: return LaunchTest(infoRef, ButtonClickHandler);
    case ButtonType.ExpressionClear: return info.setExpression([]);
    case ButtonType.ExpressionBackspace: return info.setExpression(info.expression.slice(0, -1));
    case ButtonType.MemorySave: 
      info.setMemory((+Evaluate(info.expression, info.memory)) || 0);
      info.setExpression([]);
      return;
    default: info.setExpression(TryAddButtonType(type, info.expression));
  }
}
