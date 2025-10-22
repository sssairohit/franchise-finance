import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { FundsTable } from './components/FundsTable';
import { NewsAndEvents } from './components/NewsAndEvents';
import { MutualFund } from './types';
import { mutualFundsData as baseFunds } from './constants';

type RiskAppetiteFilter = 'All' | 'Low' | 'Moderate' | 'High';
type DurationFilter = 'All' | '1 Month' | '3 Months' | '6 Months' | '1 Year' | '3 Years' | '5 Years';
type ReturnsFilter = 'All' | 'Annualized' | 'Absolute';
type MethodFilter = 'All' | 'Monthly SIP' | 'Lumpsum';
type PayoutFilter = 'All' | 'Regular' | 'Direct';
type SortKey = keyof MutualFund;
type SortDirection = 'ascending' | 'descending';

const App: React.FC = () => {
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    capitalAmount: '',
    risk: 'All' as RiskAppetiteFilter,
    duration: 'All' as DurationFilter,
    returns: 'All' as ReturnsFilter,
    method: 'All' as MethodFilter,
    payout: 'All' as PayoutFilter,
  });

  const [sortConfig, setSortConfig] = useState<{ key: SortKey | null; direction: SortDirection }>({
    key: 'vro',
    direction: 'ascending',
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const promises = baseFunds.map(fund => 
          fetch(`https://api.mfapi.in/mf/${fund.schemeCode}`).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch data for ${fund.name}`);
            return res.json();
          })
        );
        
        const results = await Promise.allSettled(promises);

        const updatedFunds = baseFunds.map((fund, index) => {
          const result = results[index];
          if (result.status === 'fulfilled' && result.value.status === 'SUCCESS') {
            const navData = result.value.data;
            if (navData && navData.length > 1) {
              // Calculate 1-year return
              const latestEntry = navData[0];
              const latestNav = parseFloat(latestEntry.nav);
              const [day, month, year] = latestEntry.date.split('-').map(Number);
              const latestDate = new Date(year, month - 1, day);
              
              const oneYearAgoDate = new Date(latestDate);
              oneYearAgoDate.setFullYear(latestDate.getFullYear() - 1);

              let oneYearAgoEntry = navData.reduce((prev, curr) => {
                const [pDay, pMonth, pYear] = prev.date.split('-').map(Number);
                const [cDay, cMonth, cYear] = curr.date.split('-').map(Number);
                const prevDate = new Date(pYear, pMonth - 1, pDay);
                const currDate = new Date(cYear, cMonth - 1, cDay);
                const prevDiff = Math.abs(prevDate.getTime() - oneYearAgoDate.getTime());
                const currDiff = Math.abs(currDate.getTime() - oneYearAgoDate.getTime());
                return currDiff < prevDiff ? curr : prev;
              });

              const oneYearAgoNav = parseFloat(oneYearAgoEntry.nav);
              const newReturnPa = ((latestNav - oneYearAgoNav) / oneYearAgoNav) * 100;
              
              return { ...fund, returnPa: newReturnPa };
            }
          }
          // Return base fund data if API fails or has no data
          return fund;
        });

        setFunds(updatedFunds);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching live data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleSort = (key: SortKey) => {
    // Special case for 'Calc. Return' header to sort by actual return
    const sortKey = key === 'calcReturn' ? 'returnPa' : key;

    let direction: SortDirection = 'ascending';
    if (sortConfig.key === sortKey && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: sortKey, direction });
  };

  const filteredAndSortedFunds = useMemo(() => {
    let filtered = [...funds];

    // Filtering logic
    const capital = parseFloat(filters.capitalAmount);
    if (!isNaN(capital) && capital > 0) {
      filtered = filtered.filter(fund => fund.fundSize >= capital);
    }
    
    if (filters.risk !== 'All') {
      filtered = filtered.filter(fund => fund.risk === filters.risk);
    }
    if (filters.duration !== 'All') {
        filtered = filtered.filter(fund => fund.duration === filters.duration);
    }
    if (filters.returns !== 'All') {
        filtered = filtered.filter(fund => fund.returns === filters.returns);
    }
    if (filters.method !== 'All') {
        filtered = filtered.filter(fund => fund.method === filters.method);
    }
    if (filters.payout !== 'All') {
        filtered = filtered.filter(fund => fund.payout === filters.payout);
    }

    // Sorting logic
    if (sortConfig.key) {
      const sorted = [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }

    return filtered;
  }, [filters, sortConfig, funds]);

  return (
    <div className="bg-[#F9F9F9] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
            <Sidebar filters={filters} onFilterChange={handleFilterChange} />
            <FundsTable 
              funds={filteredAndSortedFunds} 
              onSort={handleSort} 
              sortConfig={sortConfig}
              isLoading={isLoading}
              error={error}
            />
            <NewsAndEvents />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
