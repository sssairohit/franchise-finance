import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { FundsTable } from './components/FundsTable';
import { NewsAndEvents } from './components/NewsAndEvents';

const App: React.FC = () => {
  return (
    <div className="bg-[#F9F9F9] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-8 lg:space-y-0">
            <Sidebar />
            <FundsTable />
            <NewsAndEvents />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
