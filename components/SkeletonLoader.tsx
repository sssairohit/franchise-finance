import React from 'react';

const SkeletonCell: React.FC = () => (
    <td className="py-6 px-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
    </td>
);

const SkeletonRow: React.FC = () => (
    <tr className="border-b border-gray-200">
        <td className="py-6 px-4 text-center w-16">
            <div className="h-4 w-8 mx-auto bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="py-6 px-4">
             <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-md bg-gray-200 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                     <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </td>
        <SkeletonCell />
        <SkeletonCell />
        <SkeletonCell />
        <SkeletonCell />
        <td className="py-6 px-4">
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </td>
        <SkeletonCell />
    </tr>
);


export const SkeletonLoader: React.FC = () => {
    return (
        <>
            {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} />
            ))}
        </>
    );
};