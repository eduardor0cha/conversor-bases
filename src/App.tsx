import { Button, Input } from "./components";

function App() {
  return (
    <div className="p-home">
      <form>
        <div className="p-home__card">
          <h1>Conversor de bases</h1>
          <div className="p-home__number-inputs">
            <Input label="Número" required />
            <Input label="Base" type="number" min={2} max={36} required className="p-home__number-inputs__base" />
          </div>
          <Input label="Base de destino" type="number" min={2} required max={36} className="p-home__destination-base" />
          <Button type="submit">Converter</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
