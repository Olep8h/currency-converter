import React from 'react';
import CurrencyConverter from './CurrencyConverter';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-semibold mb-4 text-center text-blue-500">
                    Currency Converter
                </h1>
                <CurrencyConverter />
            </div>
        </div>
    );
}

export default App;
