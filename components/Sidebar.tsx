import React, { useState } from 'react';

type RiskAppetite = 'All' | 'Low' | 'Moderate' | 'High';
type Duration = 'All' | '1 Month' | '3 Months' | '6 Months' | '1 Year' | '3 Years' | '5 Years';
type Returns = 'All' | 'Annualized' | 'Absolute';
type Method = 'All' | 'Monthly SIP' | 'Lumpsum';
type Payout = 'All' | 'Regular' | 'Direct';

interface FilterButtonProps<T> {
  value: T;
  currentValue: T;
  onClick: (value: T) => void;
}

const FilterButton = <T extends string>({ value, currentValue, onClick }: FilterButtonProps<T>) => {
  const isActive = value === currentValue;
  return (
    <button
      onClick={() => onClick(value)}
      className={`w-full text-[1.4rem] py-2 px-4 rounded-md border transition-colors whitespace-nowrap ${
        isActive ? 'bg-[#E94B43] text-white border-[#E94B43]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
      }`}
    >
      {value}
    </button>
  );
};

const FilterGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 text-[1.6rem]">{title}</h3>
        {children}
    </div>
);

interface SidebarProps {
    filters: {
        capitalAmount: string;
        risk: RiskAppetite;
        duration: Duration;
        returns: Returns;
        method: Method;
        payout: Payout;
    };
    onFilterChange: (filterName: string, value: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className="w-full lg:w-80 xl:w-96 lg:pr-8">
            <button
                className="w-full flex justify-between items-center text-left lg:pointer-events-none mb-6"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="sidebar-filters"
            >
                <h2 className="text-[2.0rem] font-serif-display text-gray-800">Mutual Funds</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 lg:hidden transition-transform transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            <div id="sidebar-filters" className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
                <FilterGroup title="Calculate">
                    <input 
                        type="text" 
                        placeholder="Min Fund Size (Crs)" 
                        value={filters.capitalAmount}
                        onChange={(e) => onFilterChange('capitalAmount', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 text-[1.4rem] bg-white text-gray-800 focus:ring-2 focus:ring-[#E94B43] focus:border-transparent outline-none"
                    />
                </FilterGroup>

                <FilterGroup title="Risk Appetite">
                    <div className="grid grid-cols-2 gap-2">
                        <FilterButton value="All" currentValue={filters.risk} onClick={(v) => onFilterChange('risk', v)} />
                        <FilterButton value="Low" currentValue={filters.risk} onClick={(v) => onFilterChange('risk', v)} />
                        <FilterButton value="Moderate" currentValue={filters.risk} onClick={(v) => onFilterChange('risk', v)} />
                        <FilterButton value="High" currentValue={filters.risk} onClick={(v) => onFilterChange('risk', v)} />
                    </div>
                </FilterGroup>

                <FilterGroup title="Duration">
                    <div className="grid grid-cols-2 gap-2">
                        <FilterButton value="All" currentValue={filters.duration} onClick={(v) => onFilterChange('duration', v)} />
                        <FilterButton value="1 Month" currentValue={filters.duration} onClick={(v) => onFilterChange('duration', v)} />
                        <FilterButton value="3 Months" currentValue={filters.duration} onClick={(v) => onFilterChange('duration', v)} />
                        <FilterButton value="6 Months" currentValue={filters.duration} onClick={(v) => onFilterChange('duration', v)} />
                        <FilterButton value="1 Year" currentValue={filters.duration} onClick={(v) => onFilterChange('duration', v)} />
                        <FilterButton value="3 Years" currentValue={filters.duration} onClick={(v) => onFilterChange('duration', v)} />
                        <FilterButton value="5 Years" currentValue={filters.duration} onClick={(v) => onFilterChange('duration', v)} />
                    </div>
                </FilterGroup>

                <FilterGroup title="Returns">
                    <div className="grid grid-cols-2 gap-2">
                        <FilterButton value="All" currentValue={filters.returns} onClick={(v) => onFilterChange('returns', v)} />
                        <FilterButton value="Annualized" currentValue={filters.returns} onClick={(v) => onFilterChange('returns', v)} />
                        <FilterButton value="Absolute" currentValue={filters.returns} onClick={(v) => onFilterChange('returns', v)} />
                    </div>
                </FilterGroup>

                <FilterGroup title="Method">
                    <div className="grid grid-cols-2 gap-2">
                        <FilterButton value="All" currentValue={filters.method} onClick={(v) => onFilterChange('method', v)} />
                        <FilterButton value="Monthly SIP" currentValue={filters.method} onClick={(v) => onFilterChange('method', v)} />
                        <FilterButton value="Lumpsum" currentValue={filters.method} onClick={(v) => onFilterChange('method', v)} />
                    </div>
                </FilterGroup>

                <FilterGroup title="Payout">
                    <div className="grid grid-cols-2 gap-2">
                        <FilterButton value="All" currentValue={filters.payout} onClick={(v) => onFilterChange('payout', v)} />
                        <FilterButton value="Regular" currentValue={filters.payout} onClick={(v) => onFilterChange('payout', v)} />
                        <FilterButton value="Direct" currentValue={filters.payout} onClick={(v) => onFilterChange('payout', v)} />
                    </div>
                </FilterGroup>
            </div>
        </aside>
    );
};
