import React from 'react';

const NavItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <button className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity text-[1.6rem]">
        <span>{children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    </button>
);

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <button className="text-white hover:opacity-80 transition-opacity p-1">
        {children}
    </button>
);

const HelpCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

export const Header: React.FC = () => {
    return (
        <header className="bg-[#E94B43] shadow-md">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 md:space-x-12">
                        <h1 className="text-[2rem] text-white font-serif-display">Franchise Finance Co.</h1>
                        <nav className="hidden md:flex items-center space-x-8">
                            <NavItem>Investments</NavItem>
                            <NavItem>Insurance</NavItem>
                            <NavItem>Calculators</NavItem>
                            <NavItem>Library</NavItem>
                            <NavItem>Company</NavItem>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="hidden lg:flex items-center space-x-1 mr-2">
                             <IconWrapper><HelpCircleIcon /></IconWrapper>
                             <IconWrapper><InfoIcon /></IconWrapper>
                             <IconWrapper><GlobeIcon /></IconWrapper>
                        </div>
                        <div className="flex items-center space-x-1">
                             <IconWrapper><SearchIcon /></IconWrapper>
                             <IconWrapper><MoonIcon /></IconWrapper>
                             <IconWrapper><UserIcon /></IconWrapper>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
