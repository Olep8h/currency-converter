import React from 'react';
import axios from 'axios';
import { useCurrencyContext } from '../context/CurrencyContext';
import CurrencyConverterForm from './CurrencyConverterForm';
import CurrencyConversionResult from './CurrencyConversionResult';
import CurrencyTable from './CurrencyTable';

const api = axios.create({
    baseURL: 'https://v6.exchangerate-api.com/v6/7966b0b6fece859edef35b0f',
});

const CurrencyConverter = () => {
    const {
        amount,
        setAmount,
        currency,
        setCurrency,
        textHint,
        setTextHint,
        conversionRate,
        setConversionRate,
        entries,
        setEntries,
        totalUSD,
        setTotalUSD,
        loading,
        setLoading,
        error,
        setError,
    } = useCurrencyContext();

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        updateTextHint(event.target.value, currency);
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
        updateTextHint(amount, event.target.value);
    };

    const updateTextHint = (amount, currency) => {
        setLoading(true);
        setError('');

        api.get(`/pair/${currency}/USD/${amount}`)
            .then((response) => {
                setTextHint(`Approx. ${response.data.conversion_result.toFixed(2)} USD`);
                setConversionRate(response.data.conversion_rate);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching conversion rate:', error);
                setError('Error fetching conversion rate. Please try again later.');
                setLoading(false);
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
        setAmount('');
        setTextHint('');
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold mb-4 text-center text-blue-500">
                Currency Converter
            </h1>
            <CurrencyConverterForm
                amount={amount}
                currency={currency}
                handleAmountChange={handleAmountChange}
                handleCurrencyChange={handleCurrencyChange}
                handleSubmit={handleSubmit}
            />
            {loading && <p className="text-gray-500 mb-2">Loading...</p>}
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {!loading && !error && <CurrencyConversionResult textHint={textHint} />}
            <CurrencyTable entries={entries} conversionRate={conversionRate} />
            <p className="text-xl font-semibold">Total USD: {totalUSD.toFixed(2)}</p>
        </div>
    );
};

export default CurrencyConverter;
