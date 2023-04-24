import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  private _displayValue: string = '0';
  private _firstOperand: number | null = null;
  private _operator: string | null = null;
  private _waitingForSecondOperand: boolean = false;

  get displayValue(): string {
    return this._displayValue;
  }

  set displayValue(value: string) {
    this._displayValue = value;
  }

  get firstOperand(): number | null {
    return this._firstOperand;
  }

  set firstOperand(value: number | null) {
    this._firstOperand = value;
  }

  get operator(): string | null {
    return this._operator;
  }

  set operator(value: string | null) {
    this._operator = value;
  }

  get waitingForSecondOperand(): boolean {
    return this._waitingForSecondOperand;
  }

  set waitingForSecondOperand(value: boolean) {
    this._waitingForSecondOperand = value;
  }

  public clear() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  public inputDigit(digit: string) {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
    }
  }

  public inputDecimal() {
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  public inputOperator(newOperator: string) {
    const inputValue = parseFloat(this.displayValue);

    if (this.operator && this.waitingForSecondOperand) {
      this.operator = newOperator;
      return;
    }

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand, inputValue, this.operator);
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = newOperator;
  }

  public calculate(firstOperand: number, secondOperand: number, operator: string) {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  public performCalculation() {
    if (this.firstOperand === null || this.operator === null) {
      return;
    }

    const inputValue = parseFloat(this.displayValue);
    const result = this.calculate(this.firstOperand, inputValue, this.operator);
    this.displayValue = `${parseFloat(result.toFixed(7))}`;
    this.firstOperand = result;
    this.operator = null;
    this.waitingForSecondOperand = true;
  }
}

