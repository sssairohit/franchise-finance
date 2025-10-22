import React from 'react';
import { MutualFund } from '../types';
import { SkeletonLoader } from './SkeletonLoader';

type SortKey = keyof MutualFund;
type SortDirection = 'ascending' | 'descending';

// Helper for formatting numbers
const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

const SortIcon: React.FC<{ direction?: SortDirection }> = ({ direction }) => {
    if (!direction) return null;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {direction === 'ascending' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            )}
        </svg>
    );
};

interface TableHeaderProps {
    children: React.ReactNode;
    className?: string;
    sortKey: SortKey;
    onSort: (key: SortKey) => void;
    sortConfig?: { key: SortKey | null; direction: SortDirection };
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, className, sortKey, onSort, sortConfig }) => {
    const isSorted = sortConfig?.key === sortKey;
    const direction = isSorted ? sortConfig?.direction : undefined;

    return (
        <th className={`py-3 px-4 text-left text-[1rem] font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap ${className}`}>
            <button onClick={() => onSort(sortKey)} className="flex items-center w-full text-left focus:outline-none">
                {children}
                <SortIcon direction={direction} />
            </button>
        </th>
    );
};


const TableCell: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <td className={`py-6 px-4 text-[1.4rem] text-gray-800 whitespace-nowrap ${className}`}>
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
        <TableCell>{formatCurrency(fund.fundSize)}</TableCell>
        <TableCell className={fund.returnPa >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
            {`${fund.returnPa >= 0 ? '+' : ''} ${formatPercentage(fund.returnPa)}`}
        </TableCell>
        <TableCell>{formatPercentage(fund.expenseRatio)}</TableCell>
        <TableCell>{`${fund.exitLoad.toFixed(1)}%`}</TableCell>
        <TableCell>
            <div>{fund.age}</div>
            <div className="text-[1.2rem] text-gray-500">{fund.sinceDate}</div>
        </TableCell>
        <TableCell>
            <div className="flex items-center">
                <span>{formatCurrency(10000 * (1 + fund.returnPa / 100))}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </TableCell>
    </tr>
);

interface FundsTableProps {
    funds: MutualFund[];
    onSort: (key: SortKey) => void;
    sortConfig?: { key: SortKey | null; direction: SortDirection };
    isLoading: boolean;
    error: string | null;
}

export const FundsTable: React.FC<FundsTableProps> = ({ funds, onSort, sortConfig, isLoading, error }) => {
    
    const renderTableBody = () => {
        if (isLoading) {
            return <SkeletonLoader />;
        }
        if (error) {
            return (
                <tr>
                    <td colSpan={8} className="text-center py-12 text-red-600 text-[1.6rem]">
                        {error}
                    </td>
                </tr>
            );
        }
        if (funds.length === 0) {
            return (
                <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-500 text-[1.6rem]">
                        No mutual funds match the current filters.
                    </td>
                </tr>
            );
        }
        return funds.map((fund) => <FundRow key={fund.vro} fund={fund} />);
    };

    return (
        <div className="flex-1 bg-white overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 h-full">
                <thead className="bg-white">
                    <tr>
                        <TableHeader sortKey="vro" onSort={onSort} sortConfig={sortConfig} className="text-center">VRO</TableHeader>
                        <TableHeader sortKey="name" onSort={onSort} sortConfig={sortConfig}>Name</TableHeader>
                        <TableHeader sortKey="fundSize" onSort={onSort} sortConfig={sortConfig}>Fund size (Crs)</TableHeader>
                        <TableHeader sortKey="returnPa" onSort={onSort} sortConfig={sortConfig}>Return (p.a)</TableHeader>
                        <TableHeader sortKey="expenseRatio" onSort={onSort} sortConfig={sortConfig}>Expense Ratio</TableHeader>
                        <TableHeader sortKey="exitLoad" onSort={onSort} sortConfig={sortConfig}>Exit load</TableHeader>
                        <TableHeader sortKey="age" onSort={onSort} sortConfig={sortConfig}>Age</TableHeader>
                        <TableHeader sortKey="calcReturn" onSort={onSort} sortConfig={sortConfig}>Calc. Return</TableHeader>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {renderTableBody()}
                </tbody>
            </table>
        </div>
    );
};
