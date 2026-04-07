// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [selectCurrency, setSelectCurrency] = useState("INR");
  const [convertTo, setConvertTo] = useState("USD");
  const [result, setResult] = useState<number>();

  useEffect(function () {
  if (!amount) return;

  async function convert() {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${selectCurrency}&to=${convertTo}`
      );

      const data = await res.json();

      setResult(data.rates[convertTo]);
      console.log(data.rate);
    } catch (err) {
      console.error(err);
    }
  }

  convert();
}, [selectCurrency, convertTo, amount]);


  return (
    <div style={{marginTop: "50px"}}>
      <input type="text" value={amount} onChange={e => setAmount(Number(e.target.value))} />
      <select value={selectCurrency} onChange={e => setSelectCurrency(e.target.value)} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={convertTo} onChange={e => setConvertTo(e.target.value)} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{result}</p>
    </div>
  );
}
