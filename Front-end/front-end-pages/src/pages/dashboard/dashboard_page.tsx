import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import 'chart.js/auto';
import './dashboard_page.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface CallMetrics {
  unanswered: number;
  whatsapp: number;
  normal: number;
  today: number;
}

interface ServiceLevel {
  label: string;
  value: number;
  color: string;
}

const DashboardPage: React.FC = () => {
  const [callMetrics, setCallMetrics] = useState<CallMetrics>({
    unanswered: 20,
    whatsapp: 60,
    normal: 80,
    today: 100,
  });

  const [serviceLevels, setServiceLevels] = useState<ServiceLevel[]>([
    { label: 'Unanswered Calls', value: 20, color: '#f74a3b' },
    { label: 'WhatsApp Calls', value: 60, color: '#36b9cc' },
    { label: 'Normal Calls', value: 80, color: '#f6c23e' },
    { label: 'Calls Made Today', value: 100, color: '#1cc88a' },
  ]);

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Call Volume',
        data: [5000, 10000, 15000, 20000, 25000, 20000, 15000, 10000],
        backgroundColor: '#4e73df',
      },
    ],
  };

  const doughnutChartData = {
    labels: ['WhatsApp Calls', 'Normal Calls', 'Unanswered Calls'],
    datasets: [
      {
        data: [60, 80, 20],
        backgroundColor: ['#36b9cc', '#1cc88a', '#f74a3b'],
      },
    ],
  };

  const handleButtonClick = (action: string) => {
    alert(`Action triggered: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-blue-600"># Dashboard</h1>
        <input
          type="text"
          placeholder="Search for..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </header>

      {/* Main Content */}
      <main className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => handleButtonClick('Dial with WhatsApp')}
            className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
          >
            DIAL WITH WHATSAPP
          </button>
          <button
            onClick={() => handleButtonClick('Normal Dial')}
            className="bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700"
          >
            NORMAL DIAL
          </button>
          <button
            onClick={() => handleButtonClick('Add a Client')}
            className="bg-yellow-500 text-white py-3 px-4 rounded-md hover:bg-yellow-600"
          >
            ADD A CLIENT
          </button>
          <button
            onClick={() => handleButtonClick('Edit Client Details')}
            className="bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600"
          >
            EDIT CLIENT DETAILS
          </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Call Service Overview</h3>
            <Bar data={barChartData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Call Service Levels</h3>
            <Doughnut data={doughnutChartData} />
          </div>
        </div>

        {/* Call Summary */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Calls Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {serviceLevels.map((level) => (
              <div
                key={level.label}
                className="p-4 rounded-md shadow-md text-center"
                style={{ backgroundColor: level.color }}
              >
                <h4 className="text-white font-bold">{level.label}</h4>
                <p className="text-white text-lg">{level.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;