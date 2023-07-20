import React from 'react';

const CurrencyConverterForm = ({ amount, currency, handleAmountChange, handleCurrencyChange, handleSubmit }) => {
    return (
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
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
            >
                Submit
            </button>
        </form>
    );
};

export default CurrencyConverterForm;
