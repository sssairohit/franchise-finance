import React, { useState } from 'react';

type RiskAppetite = 'Low' | 'Moderate' | 'High';
type Duration = '1 Month' | '3 Months' | '6 Months' | '1 Year' | '3 Years' | '5 Years';
type Returns = 'Annualized' | 'Absolute';
type Method = 'Monthly SIP' | 'Lumpsum';
type Payout = 'Regular' | 'Direct';

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
      className={`w-full text-[1.4rem] py-2 px-4 rounded-md border transition-colors ${
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

export const Sidebar: React.FC = () => {
    const [risk, setRisk] = useState<RiskAppetite>('High');
    const [duration, setDuration] = useState<Duration>('3 Years');
    const [returns, setReturns] = useState<Returns>('Annualized');
    const [method, setMethod] = useState<Method>('Lumpsum');
    const [payout, setPayout] = useState<Payout>('Direct');

    return (
        <aside className="w-full lg:w-64 xl:w-72 lg:pr-6">
            <h2 className="text-[2.0rem] font-serif-display text-gray-800 mb-6">Mutual Funds</h2>
            
            <FilterGroup title="Calculate">
                <input 
                    type="text" 
                    placeholder="Enter Capital Amount" 
                    className="w-full border border-gray-300 rounded-md p-2 text-[1.4rem] focus:ring-2 focus:ring-[#E94B43] focus:border-transparent outline-none"
                />
            </FilterGroup>

            <FilterGroup title="Risk Appetite">
                <div className="flex space-x-2">
                    <FilterButton value="Low" currentValue={risk} onClick={setRisk} />
                    <FilterButton value="Moderate" currentValue={risk} onClick={setRisk} />
                </div>
                <div className="mt-2">
                    <FilterButton value="High" currentValue={risk} onClick={setRisk} />
                </div>
            </FilterGroup>

            <FilterGroup title="Duration">
                <div className="grid grid-cols-2 gap-2">
                    <FilterButton value="1 Month" currentValue={duration} onClick={setDuration} />
                    <FilterButton value="3 Months" currentValue={duration} onClick={setDuration} />
                    <FilterButton value="6 Months" currentValue={duration} onClick={setDuration} />
                    <FilterButton value="1 Year" currentValue={duration} onClick={setDuration} />
                    <FilterButton value="3 Years" currentValue={duration} onClick={setDuration} />
                    <FilterButton value="5 Years" currentValue={duration} onClick={setDuration} />
                </div>
            </FilterGroup>

            <FilterGroup title="Returns">
                <div className="grid grid-cols-2 gap-2">
                    <FilterButton value="Annualized" currentValue={returns} onClick={setReturns} />
                    <FilterButton value="Absolute" currentValue={returns} onClick={setReturns} />
                </div>
            </FilterGroup>

            <FilterGroup title="Method">
                <div className="grid grid-cols-2 gap-2">
                    <FilterButton value="Monthly SIP" currentValue={method} onClick={setMethod} />
                    <FilterButton value="Lumpsum" currentValue={method} onClick={setMethod} />
                </div>
            </FilterGroup>

            <FilterGroup title="Payout">
                <div className="grid grid-cols-2 gap-2">
                    <FilterButton value="Regular" currentValue={payout} onClick={setPayout} />
                    <FilterButton value="Direct" currentValue={payout} onClick={setPayout} />
                </div>
            </FilterGroup>
        </aside>
    );
};
