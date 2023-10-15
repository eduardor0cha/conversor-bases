import { FROM_DECIMAL, TO_DECIMAL } from "./ConvertionDictionaries";

export function checkNumber(n: string, base: number): null | string {
  const number = n.toUpperCase().trim().replace(",", ".")

  if (number.indexOf(".") !== number.lastIndexOf(".")) return "Há mais de um ponto flutuante."
  if (number.indexOf(".") === 0) return "Não possui números antes o ponto flutuante."
  if (number.indexOf(".") === number.length - 1) return "Não possui números após o ponto flutuante."
  if (number.indexOf("-") !== number.lastIndexOf("-")) return "Há mais de um sinal negativo."
  if (number.indexOf("-") > 0) return "O sinal negativo está fora do lugar"

  for (const digit of number.replace(".", "").replace("-", "")) {
    if (TO_DECIMAL[digit] === undefined || TO_DECIMAL[digit] >= base) {
      return "Há pelo menos um dígito inválido para a base determinada."
    }
  }

  return null
}

function convertToDecimal(n: string, base: number): number {
  let isNegative = false;
  if (n[0] === "-") {
    isNegative = true
  }
  const number = n.toUpperCase().trim().replace(",", ".").replace("-", "")
  const integerPart = number.split(".")[0]


  let decimalValue = 0
  for (let i = 0; i < integerPart.length; i++) {
    const digitValue = TO_DECIMAL[integerPart[(integerPart.length - 1) - i]]
    decimalValue += digitValue * (base ** i)
  }

  if (number.indexOf(".") === -1) return isNegative ? decimalValue * -1 : decimalValue;

  const floatPart = number.split(".")[1]

  for (let i = 0; i < floatPart.length; i++) {
    const digitValue = TO_DECIMAL[floatPart[i]]
    decimalValue += digitValue / (base ** (i + 1))
  }

  return isNegative ? decimalValue * -1 : decimalValue;
}

function convertFromDecimal(n: number, base: number): string {
  let number = n
  let isNegative = false;
  if (number < 0) {
    isNegative = true
    number *= -1
  }

  const integerPart = Math.trunc(number)

  let convertedValue = ""

  let aux = integerPart
  while (true) {
    convertedValue = FROM_DECIMAL[(aux % base)] + convertedValue

    aux = Math.trunc(aux / base)
    if (aux === 0) {
      break
    }
  }

  if (isNegative) convertedValue = "-" + convertedValue

  if (Math.trunc(number) === number) return convertedValue

  const floatPart = number - integerPart

  let convertedFloatPart = ""
  let aux2 = floatPart
  while (convertedFloatPart.length < 16) {
    aux2 *= base

    convertedFloatPart += FROM_DECIMAL[Math.trunc(aux2)]
    aux2 -= Math.trunc(aux2)

    if (aux2 === 0) {
      break
    }
  }

  return [convertedValue, convertedFloatPart].join(".");
}

export function convertBase(number: string, fromBase: number, toBase: number): string {
  if (fromBase === toBase) return number

  const decimalValue = convertToDecimal(number, fromBase)

  return convertFromDecimal(decimalValue, toBase)
}