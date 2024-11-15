import { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCode, setFromCode] = useState("USD");
  const [toCode, setToCode] = useState("INR");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSetAmount(evnt) {
    setAmount(Number.isFinite(evnt.target.value) ? evnt.target.value : 1);
  }

  function handleSetFromCode(evnt) {
    setFromCode(evnt.target.value);
  }

  function handleSetToCode(evnt) {
    setToCode(evnt.target.value);
  }

  useEffect(() => {
    async function getConversion() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCode}&to=${toCode}`
          // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
        );
        if (!response.ok) return;
        const data = await response.json();

        console.log(data);
        setOutput(data.rates[toCode]);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    if (fromCode === toCode) return setOutput(amount);
    getConversion();
  }, [amount, fromCode, toCode]);

  return (
    <div className="app">
      <input
        type="text"
        value={amount}
        onChange={handleSetAmount}
        disabled={isLoading}
      />
      <select
        value={fromCode}
        onChange={handleSetFromCode}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select value={toCode} onChange={handleSetToCode} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{!isLoading ? `${output} ${toCode}` : "Loading"}</p>
    </div>
  );
}
