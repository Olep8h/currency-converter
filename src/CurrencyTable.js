import React from 'react';

const CurrencyTable = ({ entries, conversionRate }) => {
    return (
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
    );
};

export default CurrencyTable;
