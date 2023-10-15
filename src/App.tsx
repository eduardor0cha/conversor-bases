import { FormEvent, useCallback, useState } from "react";
import { Button, Input } from "./components";
import { checkNumber, convertBase } from "./utils/MathUtils";

type ConvertionResult = {
  number: string;
  numberBase: number;
  convertedNumber: string;
  convertedNumberBase: number;
}

function App() {
  const [error, setError] = useState<string | null>(null)
  const [convertionResult, setConvertionResult] = useState<ConvertionResult | null>(null);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const number = e.currentTarget.number.value.toUpperCase().trim().replace(",", ".")
    const originBase = e.currentTarget.originBase.value
    const destinationBase = e.currentTarget.destinationBase.value

    const checkResult = checkNumber(number, originBase);

    if (checkResult != null) {
      setError(checkResult)
      return null;
    }

    const convertedNumber = convertBase(number, originBase, destinationBase)

    setConvertionResult({
      number: number,
      numberBase: originBase,
      convertedNumber: convertedNumber,
      convertedNumberBase: destinationBase
    })
  }, [])

  const onChange = useCallback(() => {
    setConvertionResult(null)
    setError(null)
  }, [])

  return (
    <div className="p-home">
      <form onSubmit={onSubmit} onChange={onChange} autoComplete="off">
        <div className="p-home__card">
          <h1>Conversor de bases</h1>
          <div className="p-home__number-inputs">
            <Input label="Número" required name="number" />
            <Input label="Base" type="number" name="originBase" min={2} max={36} required className="p-home__number-inputs__base" />
          </div>
          <Input label="Base de destino" type="number" name="destinationBase" min={2} required max={36} className="p-home__destination-base" />
          <Button type="submit">Converter</Button>
          {error == null ? null :
            <div className="p-home__error-container">
              <h2>Erro</h2>
              <p>{error}</p>
            </div>
          }
          {convertionResult == null ? null :
            <div className="p-home__result-container">
              <h2>Resultado</h2>
              <p>{convertionResult.number}<span>({convertionResult.numberBase})</span> = {convertionResult.convertedNumber}<span>({convertionResult.convertedNumberBase})</span></p>
            </div>
          }
        </div>
      </form>
    </div>
  );
}

export default App;
