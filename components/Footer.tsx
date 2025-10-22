import React from 'react';

const FooterLink: React.FC<{ href?: string; children: React.ReactNode }> = ({ href = '#', children }) => (
    <li>
        <a href={href} className="text-white hover:opacity-80 transition-opacity text-[1.4rem]">{children}</a>
    </li>
);

const FooterColumn: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="font-bold text-white mb-4 text-[1.6rem]">{title}</h3>
        <ul className="space-y-3">{children}</ul>
    </div>
);

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#E94B43]">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                    <div className="lg:col-span-1">
                        <h2 className="text-[2.0rem] text-white font-serif-display mb-4 lg:mb-8">Franchise Finance Co.</h2>
                    </div>
                    <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                        <FooterColumn title="Investment Instruments">
                            <FooterLink>Stock Markets & Forex</FooterLink>
                            <FooterLink>Mutual Funds & ETFs</FooterLink>
                            <FooterLink>Bank Fixed Deposits</FooterLink>
                            <FooterLink>Govt. Bonds & Schemes</FooterLink>
                        </FooterColumn>
                        <FooterColumn title="Insurance">
                            <FooterLink>Home</FooterLink>
                            <FooterLink>Health</FooterLink>
                            <FooterLink>Wealth</FooterLink>
                            <FooterLink>Life</FooterLink>
                            <FooterLink>Automotive</FooterLink>
                            <FooterLink>Travel</FooterLink>
                        </FooterColumn>
                        <FooterColumn title="Calculators">
                            <FooterLink>SIP / Lumpsum</FooterLink>
                            <FooterLink>Goal Planner</FooterLink>
                            <FooterLink>Success Templates</FooterLink>
                        </FooterColumn>
                        <FooterColumn title="Library">
                            <FooterLink>Financial 101</FooterLink>
                            <FooterLink>Markets 101</FooterLink>
                            <FooterLink>Retirement 101</FooterLink>
                            <FooterLink>Generational Wealth</FooterLink>
                            <FooterLink>Asset Movement</FooterLink>
                            <FooterLink>Advanced Concepts</FooterLink>
                        </FooterColumn>
                        <FooterColumn title="Company">
                            <FooterLink>About Us</FooterLink>
                            <FooterLink>Privacy Policy</FooterLink>
                            <FooterLink>Pressroom</FooterLink>
                            <FooterLink>Support</FooterLink>
                        </FooterColumn>
                    </div>
                </div>
            </div>
        </footer>
    );
};
