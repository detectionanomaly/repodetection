import React from 'react';

const Sidebar = ({ crimes, filters, setFilters }) => {
  const crimeCounts = crimes.reduce((acc, crime) => {
    acc[crime.primary_type] = (acc[crime.primary_type] || 0) + 1;
    return acc;
  }, {});

  const handleTypeChange = (e) => {
    setFilters({ ...filters, type: e.target.value });
  };

  const handleDateChange = (e) => {
    setFilters({ ...filters, date: e.target.value });
  };

  return (
    <div className="w-1/3 bg-gray-800 text-white h-full p-6 overflow-y-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Crime Filters</h2>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold">Filter by Type:</label>
        <select
          className="w-full p-3 bg-gray-700 rounded-lg text-sm"
          value={filters.type}
          onChange={handleTypeChange}
        >
          <option value="">All</option>
          {Object.keys(crimeCounts).map((type) => (
            <option key={type} value={type}>
              {type} ({crimeCounts[type]})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold">Filter by Date:</label>
        <input
          type="date"
          className="w-full p-3 bg-gray-700 rounded-lg text-sm"
          value={filters.date}
          onChange={handleDateChange}
        />
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-4">Crime Counts</h2>
      <ul className="mt-2 space-y-2">
        {Object.keys(crimeCounts).map((type) => (
          <li key={type} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
            <span>{type}</span>
            <span className="font-semibold">{crimeCounts[type]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;