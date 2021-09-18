import { ButtonType, ExpressionOperationType, GetButtonExpressionOperationType, GetButtonName } from "../Buttons/ButtonTypes";


const ErrorMessage = "Ошибка";

const PrecisionDigitsCount = 15;


function fact(n: number): number {
  if (n - Math.trunc(n) !== 0) throw "passed non-integer number";
  if (n < 0) throw "passed negative number";

  if (n < 1) return 1;
  return n * fact(n-1);
}

function GetBracketsBallance(expression: string): number {
  let ballance = 0;
  for (let sym of expression) {
    if (sym === '(') ballance++;
    if (sym === ')') ballance--;
  }
  return ballance;
}

function TryAddBracketsToExpression(expression: string, sequence: ButtonType[]): string {

  const ballance = GetBracketsBallance(expression);
  const lastButtonType = sequence[sequence.length - 1];
  if (!lastButtonType) {
    if (expression.length > 0) throw "wait how the..? (expression.length > 0)"
    return "(";
  }
  if (expression.length === 0) throw "wait how the..? (expression.length === 0)"
  
  const lastExpressionType = GetButtonExpressionOperationType(lastButtonType);

  switch (lastExpressionType) {
    case ExpressionOperationType.SymbolPoint:
      return expression;
    case ExpressionOperationType.MathOperation:
    case ExpressionOperationType.MathFunction:
      return expression + '(';
  }

  if (lastExpressionType === ExpressionOperationType.SymbolBrackets) {
    const lastSymbol = expression[expression.length - 1];
    switch (lastSymbol) {
      case '(':
        return expression + '(';
      case ')':
        if (ballance < 0) throw "wait how the..? (ballance < 0)";
        return ballance > 0 ? expression + ')' : '(' + expression + ')';
    }
    throw "wait how the..? (lastSymbol isn't a bracket)";
  }
  
  if (! [
    ExpressionOperationType.DigitZero, 
    ExpressionOperationType.DigitNonZero, 
    ExpressionOperationType.SymbolConst 
    ].includes(lastExpressionType)) 
      throw "wait how the..? (lastExpressionType isn't digit or const) " + lastExpressionType;
  
  return ballance > 0 ? expression + ')' : '(' + expression + ')';
};

function BuildEvalExpression(sequence: ButtonType[], memory: number) : string {

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
      case ButtonType.OperatorPlus:
      case ButtonType.OperatorMinus:
      case ButtonType.OperatorMultiply:
      case ButtonType.OperatorDivide:
        result = result + GetButtonName(type);
        break;
      
      case ButtonType.OperatorPow: 
        result = result + '**';
        break;
      case ButtonType.OperatorMod: 
        result = result + '%';
        break;
      
      case ButtonType.ConstPi:
        result = result + "Math.PI";
        break;
      case ButtonType.ConstE:
        result = result + "Math.E";
        break;

      case ButtonType.FunctionSin:
        result = result + "Math.sin(";
        break;
      case ButtonType.FunctionCos:
        result = result + "Math.cos(";
        break;
      case ButtonType.FunctionTg:
        result = result + "Math.tan(";
        break;
      
      case ButtonType.FunctionArcSin:
        result = result + "Math.asin(";
        break;
      case ButtonType.FunctionArcCos:
        result = result + "Math.acos(";
        break;
      case ButtonType.FunctionArcTg:
        result = result + "Math.atan(";
        break;
      
      case ButtonType.FunctionLog2:
        result = result + "Math.log2(";
        break;
      case ButtonType.FunctionLogE:
        result = result + "Math.log(";
        break;
      case ButtonType.FunctionLog10:
        result = result + "Math.log10(";
        break;
  
      case ButtonType.FunctionSqrt: 
        result = result + 'Math.sqrt(';
        break;

      case ButtonType.FunctionFact: 
        result = result + 'fact(';
        break;

      case ButtonType.MemoryLoad:
        result = result + '(' + memory + ')';
        break;

      default: throw "Unknown button type";
    }
  }

  return result;
}

function BeautifyNumber(x: number): string {
  const precisioned = +(x.toPrecision(PrecisionDigitsCount));
  if (Math.abs(precisioned) > 10**PrecisionDigitsCount) 
    return precisioned.toExponential();
  else 
    return precisioned.toString();
}

function Evaluate(sequence: ButtonType[], memory: number) : string {

  const expression = BuildEvalExpression(sequence, memory);

  if (expression.length === 0) return '';
  
  const ballance = GetBracketsBallance(expression);

  if (sequence.length === 0) throw "how did you create expression without buttons?!";
  if (ballance < 0) throw "how did you put these closing brackets?!";

  const lastSymbol = expression[expression.length - 1];
  const lastButtonType = sequence[sequence.length - 1];
  const lastExpressionType = GetButtonExpressionOperationType(lastButtonType);

  if (lastSymbol === '(') return '';
  if ([
      ExpressionOperationType.MathFunction,
      ExpressionOperationType.MathOperation,
    ].includes(lastExpressionType)) 
    return '';

  
  try {
    const try_expression = expression + ')'.repeat(ballance);
    const result = BeautifyNumber(+eval(try_expression));
    if (!isNaN(parseFloat(result))) return result;
  }
  catch { }


  return ErrorMessage;
}

export { TryAddBracketsToExpression, BeautifyNumber, Evaluate, ErrorMessage }