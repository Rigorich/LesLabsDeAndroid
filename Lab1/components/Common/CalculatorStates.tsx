import { ButtonType } from "../Buttons/ButtonTypes";

export default interface CalculatorStates {
  expression: ButtonType[],
  setExpression: (value: ButtonType[]) => void,
  memory: number,
  setMemory: (value: number) => void,
};
