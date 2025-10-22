import React, { useState } from 'react';
import { newsData } from '../constants';

export const NewsAndEvents: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className="w-full lg:w-80 xl:w-96 lg:pl-8 lg:border-l lg:border-gray-200">
            <button
                className="w-full flex justify-between items-center text-left lg:pointer-events-none mb-6"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="news-events-list"
            >
                <h2 className="text-[2.0rem] font-serif-display text-gray-800">News & Events</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 lg:hidden transition-transform transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div id="news-events-list" className={`space-y-6 ${isOpen ? 'block' : 'hidden'} lg:block`}>
                {newsData.map((item, index) => (
                    <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0">
                        <p className="font-semibold text-gray-800 text-[1.4rem]">{item.title}</p>
                        <p className="text-[1.2rem] text-gray-500">{item.date}</p>
                    </div>
                ))}
            </div>
        </aside>
    );
};