import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

// 1. Create a Context
const CounterContext = createContext();

// 2. Create Parent Component
function Counter({ children }) {
  const [count, setCount] = useState(0); 
  const increase = () => setCount((currCount) => currCount + 1);
  const decrease = () => setCount((currCount) => currCount - 1);
  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span> {children}</span>
    </CounterContext.Provider>
  );
}

// 3. Create Child components to help implementing commontask
function Count() {
  const { count } = useCounter();
  return <span>{count}</span>;
}
function Label({ children }) {
  return <span>{children}</span>;
}
function Increase({ icon }) {
  const { increase } = useCounter();

  return <button onClick={increase}>{icon}</button>;
}
function Decrease({ icon }) {
  const { decrease } = useCounter();
  return <button onClick={decrease}>{icon}</button>;
}

function useCounter() {
  const context = useContext(CounterContext);
  if (!context)
    throw new Error("Counter Context was used outside Counter Provider");
  return context;
}

// 4. Add the child components as properties to parent component

Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
