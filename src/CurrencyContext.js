import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [textHint, setTextHint] = useState('');
    const [conversionRate, setConversionRate] = useState(1);
    const [entries, setEntries] = useState([]);
    const [totalUSD, setTotalUSD] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <CurrencyContext.Provider
            value={{
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
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrencyContext = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrencyContext must be used within a CurrencyProvider');
    }
    return context;
};
