import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [primaryTypeCounts, setPrimaryTypeCounts] = useState({});
  const [dateCounts, setDateCounts] = useState({});

  useEffect(() => {
    fetch('/path/to/crime.csv')
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          complete: (result) => {
            const data = result.data;
            console.log('Parsed Data:', data); // Debugging

            const primaryTypeCounts = {};
            const dateCounts = {};

            data.forEach((row) => {
              console.log('Row:', row); // Debugging
              const primaryType = row['Primary Type'];
              const date = new Date(row['Date']);

              if (primaryType) {
                primaryTypeCounts[primaryType] = (primaryTypeCounts[primaryType] || 0) + 1;
              }

              if (!isNaN(date)) {
                const formattedDate = date.toLocaleDateString();
                dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
              }
            });

            console.log('Primary Type Counts:', primaryTypeCounts); // Debugging
            console.log('Date Counts:', dateCounts); // Debugging

            setPrimaryTypeCounts(primaryTypeCounts);
            setDateCounts(dateCounts);

            setChartData({
              labels: Object.keys(primaryTypeCounts),
              datasets: [
                {
                  label: 'Number of Crimes',
                  data: Object.values(primaryTypeCounts),
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            });
          },
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Crime Dashboard</h1>
        {chartData ? (
          <>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Crimes by Primary Type</h2>
              <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Crimes by Primary Type' } } }} />
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Crimes by Date</h2>
              <Bar data={{ labels: Object.keys(dateCounts), datasets: [{ label: 'Number of Crimes', data: Object.values(dateCounts), backgroundColor: 'rgba(54, 162, 235, 0.5)' }] }} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Crimes by Date' } } }} />
            </div>
          </>
        ) : (
          <p className="text-white text-center">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;