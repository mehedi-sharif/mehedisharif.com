import React from "react";

const TimelineSkeleton = () => {
  return (
    <div className="container">
      <div className="py-16">
        <div className="flex items-center justify-center">
          <ul className="relative border-l border-border pl-0 dark:border-darkmode-border">
            <h2 className="skeleton-loader-text mb-6 h-8 w-64 animate-pulse bg-gray-200 dark:bg-darkmode-border"></h2>
            {[...Array(5)].map((_, index) => (
              <li key={index} className="mb-12 ml-4">
                <div className="skeleton-loader-image absolute -left-1.5 mt-2 h-3 w-3 animate-pulse rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-darkmode-border"></div>
                <h3 className="skeleton-loader-heading mt-0 mb-1 w-64 animate-pulse text-lg font-semibold"></h3>
                <p className="skeleton-description skeleton-loader-text mb-4 mt-2 w-1/2 animate-pulse text-sm font-normal"></p>
                <p className="skeleton-description skeleton-loader-text mb-4 mt-2 animate-pulse text-sm font-normal"></p>
              </li>
            ))}
            <button className="skeleton-loader-text absolute -left-[20px] h-8 w-8 animate-pulse rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-darkmode-border">
              <span className="text-white dark:text-dark">+</span>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimelineSkeleton;
