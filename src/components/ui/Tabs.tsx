import React, { useState } from 'react';

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultIndex?: number;
  withBorder?: boolean;
};

const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0, withBorder = true }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base cursor-pointer ${
              idx === activeIndex
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={`w-full ${
          withBorder ? 'border border-dashed border-gray-400' : ''
        } rounded-md bg-white shadow-sm p-4 sm:p-6 overflow-x-auto`}
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
