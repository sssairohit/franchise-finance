import React from 'react';
import { newsData } from '../constants';

export const NewsAndEvents: React.FC = () => {
    return (
        <aside className="w-full lg:w-64 xl:w-72 lg:pl-6 lg:border-l lg:border-gray-200">
            <h2 className="text-[2.0rem] font-serif-display text-gray-800 mb-6">News & Events</h2>
            <div className="space-y-6">
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
