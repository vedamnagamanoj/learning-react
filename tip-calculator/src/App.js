import { useState } from "react";

export default function App() {
  const [billAmount, setBillAmount] = useState("");
  const [myPercent, setMyPercent] = useState(0);
  const [friendPercent, setFriendPercent] = useState(0);

  function handleBillAmount(evnt) {
    setBillAmount(+evnt.target.value);
  }
  function handleMyTipPercent(evnt) {
    setMyPercent(+evnt.target.value);
  }
  function handleFriendTipPercent(evnt) {
    setFriendPercent(+evnt.target.value);
  }
  function handleReset() {
    setBillAmount("");
    setMyPercent("0");
    setFriendPercent("0");
  }

  return (
    <div className="App">
      <Bill billAmount={billAmount} handleBillAmount={handleBillAmount}>
        How much was the bill?
      </Bill>
      <Service tipPercent={myPercent} handleTipChange={handleMyTipPercent}>
        How did you like the service?
      </Service>
      <Service
        tipPercent={friendPercent}
        handleTipChange={handleFriendTipPercent}
      >
        How did your friend like the service?
      </Service>
      <Total
        billAmount={billAmount}
        myPercent={myPercent}
        friendPercent={friendPercent}
      />
      <Reset billAmount={billAmount} handleReset={handleReset} />
    </div>
  );
}

function Bill({ billAmount, children, handleBillAmount }) {
  return (
    <>
      {children}
      <input type="number" value={billAmount} onChange={handleBillAmount} />
      <br />
    </>
  );
}

function Service({ tipPercent, handleTipChange, children }) {
  return (
    <>
      {children}
      <select value={tipPercent} onChange={handleTipChange}>
        <option value="0">{`Dissatisfied (0%)`}</option>
        <option value="5">{`It was okay (5%)`}</option>
        <option value="10">{`It was good (10%)`}</option>
        <option value="20">{`Absolutely amazing! (20%)`}</option>
      </select>
      <br />
    </>
  );
}

function Total({ billAmount, myPercent, friendPercent }) {
  if (!billAmount) return;

  const tipAmount = billAmount * ((myPercent + friendPercent) / 2 / 100);
  const totalAmount = billAmount + tipAmount;
  return (
    <h3>{`You pay $${totalAmount} ($${billAmount} + $${tipAmount} tip)`}</h3>
  );
}

function Reset({ billAmount, handleReset }) {
  if (!billAmount) return;
  return <button onClick={handleReset}>Reset</button>;
}
