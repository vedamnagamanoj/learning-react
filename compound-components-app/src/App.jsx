import Counter from "./Counter";

function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      <div>
        <Counter>
          <Counter.Label>My super flexible counter</Counter.Label>
          <Counter.Decrease icon="-" />
          <Counter.Count />
          <Counter.Increase icon="+" />
        </Counter>
      </div>
      <div>
        <Counter>
          <Counter.Label>My super flexible reverse counter</Counter.Label>
          <Counter.Increase icon="➕" />
          <Counter.Count />
          <Counter.Decrease icon="◀️" />
        </Counter>
      </div>
    </div>
  );
}

export default App;
