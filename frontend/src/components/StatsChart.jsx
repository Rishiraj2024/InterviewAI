import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsChart = ({ interviews }) => {
  const completedInterviews = [...interviews]
    .filter((int) => int.status === 'COMPLETED' && int.feedback)
    .reverse(); // Show oldest to newest

  const data = {
    labels: completedInterviews.map((int) => int.jobTitle),
    datasets: [
      {
        label: 'Overall Performance Score (%)',
        data: completedInterviews.map((int) => int.feedback.overallScore),
        backgroundColor: 'rgba(99, 102, 241, 0.65)', // Indigo
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${context.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      {completedInterviews.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          Complete interviews to populate history chart.
        </div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default StatsChart;
