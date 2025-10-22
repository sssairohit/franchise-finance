import React from 'react';
import { mutualFundsData } from '../constants';
import { MutualFund } from '../types';

const TableHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <th className={`py-3 px-4 text-left text-[1rem] font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap ${className}`}>
        {children}
    </th>
);

const TableCell: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <td className={`py-4 px-4 text-[1.4rem] text-gray-800 whitespace-nowrap ${className}`}>
        {children}
    </td>
);

const FundRow: React.FC<{ fund: MutualFund }> = ({ fund }) => (
    <tr className="border-b border-gray-200">
        <TableCell className="text-center w-16">{String(fund.vro).padStart(2, '0')}</TableCell>
        <TableCell>
            <div className="flex items-center space-x-3">
                <img src={fund.logoUrl} alt={`${fund.name} logo`} className="w-8 h-8 rounded-md" />
                <div>
                    <div className="font-medium whitespace-normal">{fund.name}</div>
                    <div className="text-[1.2rem] text-gray-500">{fund.category}</div>
                </div>
            </div>
        </TableCell>
        <TableCell>{fund.fundSize}</TableCell>
        <TableCell className="text-green-600 font-medium">{fund.returnPa}</TableCell>
        <TableCell>{fund.expenseRatio}</TableCell>
        <TableCell>{fund.exitLoad}</TableCell>
        <TableCell>
            <div>{fund.age}</div>
            <div className="text-[1.2rem] text-gray-500">{fund.sinceDate}</div>
        </TableCell>
        <TableCell>
            <div className="flex items-center">
                <span>{fund.calcReturn}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </TableCell>
    </tr>
);


export const FundsTable: React.FC = () => {
    return (
        <div className="flex-1 bg-white overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                    <tr>
                        <TableHeader className="text-center">VRO</TableHeader>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Fund size (Crs)</TableHeader>
                        <TableHeader>Return (p.a)</TableHeader>
                        <TableHeader>Expense Ratio</TableHeader>
                        <TableHeader>Exit load</TableHeader>
                        <TableHeader>Age</TableHeader>
                        <TableHeader>Calc. Return</TableHeader>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {mutualFundsData.map((fund) => (
                        <FundRow key={fund.vro} fund={fund} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
