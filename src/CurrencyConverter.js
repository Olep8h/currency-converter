import React, { useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [textHint, setTextHint] = useState("");
    const [conversionRate, setConversionRate] = useState(1);
    const [entries, setEntries] = useState([]);
    const [totalUSD, setTotalUSD] = useState(0);

    const apiKey = "7966b0b6fece859edef35b0f";

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        updateTextHint(event.target.value, currency);
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
        updateTextHint(amount, event.target.value);
    };

    const updateTextHint = (amount, currency) => {
        axios
            .get(
                `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency}/USD/${amount}`
            )
            .then((response) => {
                setTextHint(`Approx. ${response.data.conversion_result.toFixed(2)} USD`);
                setConversionRate(response.data.conversion_rate);
            })
            .catch((error) => {
                console.error("Error fetching conversion rate:", error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const entry = {
            amount: amount,
            currency: currency,
        };
        setEntries([...entries, entry]);
        setTotalUSD((prevTotalUSD) => prevTotalUSD + amount * conversionRate);
        setAmount("");
        setTextHint("");
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <form onSubmit={handleSubmit} className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700">
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className="block w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
                        required
                    />
                </label>
                <label className="block mb-2 font-semibold text-gray-700">
                    Currency:
                    <select
                        value={currency}
                        onChange={handleCurrencyChange}
                        className="block w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="CZK">CZK</option>
                        {/* Add more currencies as needed */}
                    </select>
                </label>
                <p className="text-gray-500 mb-2">{textHint}</p>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
                >
                    Submit
                </button>
            </form>
            <table className="w-full mb-6">
                <thead>
                <tr>
                    <th className="px-4 py-2 text-left">Original Amount</th>
                    <th className="px-4 py-2 text-left">Converted Amount (USD)</th>
                </tr>
                </thead>
                <tbody>
                {entries.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                        <td className="px-4 py-2">
                            {entry.amount} {entry.currency}
                        </td>
                        <td className="px-4 py-2">
                            {(entry.amount * conversionRate).toFixed(2)} USD
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="text-xl font-semibold">Total USD: {totalUSD.toFixed(2)}</p>
        </div>
    );
};

export default CurrencyConverter;
